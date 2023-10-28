const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const userSchema = require("./schemas/userSchema")
const ketchSchema = require("./schemas/ketchSchema");
const hangoutSchema = require("./schemas/hangoutSchema")
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
    accessKeyId: "AKIATTJ3GFNWVFE4D4V5",
    secretAccessKey: "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",
    region: "us-east-1",
  });

// Initialize multers3 with our s3 config and other options
const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_BUCKET,
        acl: 'public-read',
        metadata(req, file, cb) {
        cb(null, {fieldName: file.fieldname});
        },
        key(req, file, cb) {
        cb(null, Date.now().toString() + '.png');
        }
    })
})

const mongodbConnect = async () => await mongoose.connect(
    'mongodb+srv://kunrius:05689023aA@cluster0.wlajcrq.mongodb.net/?retryWrites=true&w=majority',
    {keepAlive: true})
mongodbConnect()

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// user signup
app.post('/user/signup', async (req, res) => {
    findUser = null
    try{
        findUser = await userSchema.findOne({
            email: req.body.email
        })
    }catch(err){
        
    }
    if(findUser !== null){
        res.status(400).send({message: "User already exists"})
        return
    }
    hexColors = ["E8E09A","A4DCB9","5BCEBF","83E2E5","738CD1"]
    user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        icon: "",
        hash: "",
        salt: "",
        streak: 0,
        ketches: [],
        notification: []
    })
    icon = `https://source.boringavatars.com/beam/120/${user._doc._id}?colors=E8E09A,A4DCB9,5BCEBF,83E2E5,738CD1`
    user._doc.icon = icon
    user.setPassword(req.body.password)
    await user.save()
    res.status(201).send({...user._doc, message: "OK"})
}); 

// used for authentication
app.post('/user/login', async (req, res) => {
    user = null
    try{
        user = await userSchema.findOne({
            email: req.body.email
        })
    }catch(err){
        
    }
    if (user === null){
        res.status(400).send({message: "Incorrect username or password"})
        return
    }
    if (user.authenticate(req.body.password)){
        res.status(201).send({userId: user._doc._id, message: "OK"})
    }else{
        res.status(400).send({message: "Incorrect username or password"})
    }
});

// get user, provided user id
app.get('/user', async (req, res) => {
    user = null
    try{
        user = await userSchema.findOne({
            _id: req.body.id
        })
    }catch(err){
        
    }
    if (user === null) {
        res.status(400).send({message: "Cannot get user"})
        return
    }
    ketches = []
    for(const ketchid of user._doc.ketches){
        ketch = await ketchSchema.findOne({
            _id: ketchid
        })
        if(ketch === null){
            res.status(400).send("Error getting sketch")
            return
        }
        ketches.push(ketch._doc)
    }
    user._doc.ketches = ketches
    res.status(200).send({...user._doc, message: "OK"})
});

// create ketch
app.post('/ketch', async (req, res) => {
    joincode = (Math.random()*6).toString(36)
    hangouts = await hangoutSchema.find()
    preference = {}
    for(const h of hangouts){
        preference[h._doc._id] = {
            name: h._doc.name,
            pic: h._doc.pic,
            votes: []
        }
    }
    user = null
    try{
        user = await userSchema.findOne({
            _id: req.body.userId
        })
    }catch(err){
        
    }
    
    if(user === null){
        res.status(400).send("User not found")
        return
    }
    ketch = new ketchSchema({
        name: req.body.name,
        creator: req.body.userId,
        status: "SCHEDULED",
        activity: {
            name: "undecided",
            pic: ""
        },
        deadline: new Date(Number(req.body.deadline)),
        photo: "empty",
        joincode: joincode,
        preference: preference,
        swiped: [],
        users: [req.body.userId]
    })
    await ketch.save()
    // add ketchid to user
    try{
        await userSchema.findOneAndUpdate({
            _id: req.body.userId
        },{
            $push: {
                ketches: ketch._doc._id
            }
        })
    }catch(err){

    }
    
    res.status(201).send({...ketch._doc, message: "OK"})
});

// get ketch
app.get('/ketch', async (req, res) => {
    ketch = null
    try{
        ketch = await ketchSchema.findOne({
            _id: req.body.ketchId
        })
    }catch(err){
        
    }
    
    if (ketch === null){
        res.status(400).send({message: "Ketch not found"})
        return
    }
    res.status(200).send({...ketch._doc, message: "OK"})
});

// join ketch
// TODO: client needs to connect to websocket
app.put('/ketch/join', async (req, res) => {
    ketch = null
    try{
        ketch = await ketchSchema.findOne({
            joincode: req.body.joinCode
        })
    }catch(err){
        
    }
    if (ketch === null){
        res.status(400).send({message: "Ketch not found"})
        return
    }
    if (ketch._doc._status !== "SCHEDULED"){
        res.status(400).send({message: "Ketch is not available for scheduling"})
        return
    }
    // add ketchid to user
    try{
        await userSchema.findOneAndUpdate({
            _id: req.body.userId
        },{
            $push: {
                ketches: ketch._doc._id,
            }
        })
    }catch(err){

    }
    
    // add userid to ketch
    try{
        await ketchSchema.findOneAndUpdate({
            _id: ketch._doc._id
        },{
            $push: {
                users: req.body.userId,
            }
        })
    }catch(err){

    }
    
    res.status(201).send({ketchId: ketch._doc._id, message: "OK"})
});

// update ketch when swiping
app.put('/ketch/swipe', async (req, res) => {
    ketch = null
    try{
        ketch = await ketchSchema.findOne({
            _id: req.body.ketchId
        })
    }catch(err){
        
    }
    if (ketch === null){
        res.status(400).send({message: "Ketch not found"})
        return
    }

    try{
        await ketchSchema.findOneAndUpdate({
            _id: req.body.ketchId
        },{
            $push: {
                [`preference.${req.body.hangoutId}`]: req.body.userId
            }
        })
    }catch(err){

    }
    
    if(!ketch._doc.swiped.contains(req.body.userId)){
        try{
            await ketchSchema.findOneAndUpdate({
                _id: req.body.ketchId
            },{
                $push: {
                    swiped: req.body.userId
                }
            })
        }catch(err){

        }
    }
    res.status(204).send({...ketch._doc, message: "OK"})
});


// plan the sketch (complete the planning phase)
// TODO: multicast message to websockets
app.put('/ketch/plan', async (req, res) => {
    ketch = null
    try{
        ketch = await ketchSchema.findOne({
            _id: req.body.ketchId
        })
    }catch(err){
        
    }
    if (ketch === null){
        res.status(400).send({message: "Ketch not found"})
        return
    }
    if (ketch._doc.status !== "SCHEDULED"){
        res.status(400).send({message: "Incorrect ketch status"})
        return
    }
    preference = ketch._doc.preference
    activity = Object.keys(preference).map(elem => [preference[elem].length, elem]).sort().reverse()[0][1]
    await ketchSchema.updateOne({
        _id: req.body.ketchId
    },{
        $set: {
            status: "PLANNED",
            activity: {
                name: preference[activity].name,
                pic: preference[activity].pic
            }
        }
    })
    res.status(204).send({...ketch._doc, message: "OK"})
});

// complete the ketch (upload photo)
app.post('/ketch/complete', upload.single('photo'), async (req, res) => {
    ketch = null
    try{
        ketch = await ketchSchema.findOne({
            _id: req.body.ketchId
        })
    }catch(err){
        
    }
    if (ketch === null){
        res.status(400).send({message: "Ketch not found"})
        return
    }
    if (ketch._doc.status !== "PLANNED"){
        res.status(400).send({message: "Incorrect ketch status"})
        return
    }
    
    await ketchSchema.updateOne({
        _id: req.body.ketchId
    },{
        $set: {
            status: "COMPLETED",
            photo: req.file?.location
        }
    })
    for(const userId of ketch._doc.users){
        try{
            await userSchema.findOneAndUpdate({
                _id: userId
            },{
                $inc: {
                    streak: 1
                }
            })
        }catch(err){

        }
    }
    res.status(204).send({...ketch._doc, message: "OK"})
});
