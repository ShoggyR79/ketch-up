const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const userSchema = require("./schemas/userSchema")
const ketchSchema = require("./schemas/ketchSchema");
const hangoutSchema = require("./schemas/hangoutSchema")
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

var fs = require("fs");
var https = require("https");

const s3 = new aws.S3({
    accessKeyId: "AKIATTJ3GFNWVFE4D4V5",
    secretAccessKey: "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",
    region: "us-east-1",
  });

// Initialize multers3 with our s3 config and other options
const upload = multer({
    storage: multerS3({
        s3,
        bucket: "ketch-up-vandyhacks",
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
app.listen(port, () => console.log(`Listening on port ${port}`));
// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key"),
//       cert: fs.readFileSync("server.cert"),
//     },
//     app
//   )
//   .listen(port, function () {
//     console.log(
//       "App listening"
//     );
//   });

// user signup
app.post('/user/signup', async (req, res) => {
    let findUser = null
    try{
        findUser = await userSchema.findOne({
            email: req.body.email
        })
    }catch(err){
        
    }
    if(findUser !== null){
        res.status(400).send({message:"User already exists"})
        return
    }
    let user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        icon: "",
        hash: "",
        salt: "",
        streak: 0,
        ketches: [],
        notification: []
    })
    let icon = `https://source.boringavatars.com/beam/120/${user._doc._id}`
    user._doc.icon = icon
    user.setPassword(req.body.password)
    await user.save()
    res.status(201).send({message: "OK"})
}); 

// used for authentication
app.post('/user/login', async (req, res) => {
    let user = null
    try{
        user = await userSchema.findOne({
            email: req.body.email
        })
    }catch(err){
        
    }
    if (user === null){
        res.status(400).send({message:"Incorrect username or password"})
        return
    }
    if (user.authenticate(req.body.password)){
        res.status(201).send({message: user._doc._id})
    }else{
        res.status(400).send({message: "Incorrect username or password"})
    }
});

// get user, provided user id
app.get('/user/:userId', async (req, res) => {
    let user = null
    try{
        user = await userSchema.findOne({
            _id: req.params.userId
        })
    }catch(err){
        
    }
    if (user === null) {
        res.status(400).send({message:"Cannot get user"})
        return
    }
    let ketches = []
    for(const ketchid of user._doc.ketches){
        let ketch = null
        try{
            ketch = await ketchSchema.findOne({
                _id: ketchid
            })
        }catch(err){

        }
        
        if(ketch === null){
            res.status(400).send({message:"Error getting sketch"})
            return
        }
        ketches.push(ketch._doc)
    }
    user._doc.ketches = ketches
    res.status(200).send({message: user._doc})
});

const generateHangouts = async (location) => {
    let query = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': 'AIzaSyBAWSSsDlRFHA5iEawa6CuGFY357LxKbfE',
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.photos'
        },
        body: JSON.stringify({
            'textQuery': `Fun activities or restaurants in ${location}`,
            'language_code': 'en'
        })
    });
    query = await query.json()
    hangouts = []
    for(let i=0;i<Math.min(10, query.places?.length);++i){
        let place = query.places[i]
        let h = {
            name: place.displayName.text,
            address: place.formattedAddress,
            id: (Math.random()*10).toString(36).substring(2)
        }
        let resource = place.photos[0].name
        resource = resource.substring(resource.lastIndexOf("/")+1)
        let height = place.photos[0].heightPx
        let width = place.photos[0].widthPx
        let url = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${resource}&sensor=false&maxheight=${height}&maxwidth=${width}&key=AIzaSyBAWSSsDlRFHA5iEawa6CuGFY357LxKbfE`
        h.pic = url
        hangouts.push(h)
    }
    // shuffle
    hangouts = hangouts
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    return hangouts
}

app.get('/', async(req, res) => {
    res.send({message: "Hello"})
})
// create ketch
app.post('/ketch', async (req, res) => {
    let joincode = (Math.random()*6).toString(36).substring(2,8).toUpperCase()
    let hangouts = await generateHangouts(req.body.location)
    let preference = {}
    for(const h of hangouts){
        preference[h.id] = {
            name: h.name,
            pic: h.pic,
            address: h.address,
            id: h.id,
            votes: [],
            voteNo: []
        }
    }
    let user = null
    try{
        user = await userSchema.findOne({
            _id: req.body.userId
        })
    }catch(err){
        
    }
    
    if(user === null){
        res.status(400).send({message: "User not found"})
        return
    }
    let ketch = new ketchSchema({
        name: req.body.name,
        creator: req.body.userId,
        status: "SCHEDULED",
        activity: {
            name: "undecided",
            pic: "",
            address: ""
        },
        deadline: new Date(Number(req.body.deadline)),
        photo: "https://scontent-atl3-2.xx.fbcdn.net/v/t1.15752-9/387577117_850877816695243_3854472143110188776_n.png?_nc_cat=101&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=y0TDCtbF4WAAX8wPUci&_nc_ht=scontent-atl3-2.xx&oh=03_AdRvG6yOFaiwPM_lWH7JQaUqCtTvcLxW6LUGV8aRi-XARw&oe=656550EB",
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
    
    res.status(201).send({message: ketch._doc._id})
});

// get ketch
app.get('/ketch/:ketchId', async (req, res) => {
    let ketch = null
    try{
        ketch = await ketchSchema.findOne({
            _id: req.params.ketchId
        })
    }catch(err){
        
    }
    
    if (ketch === null){
        res.status(400).send({message:"Ketch not found"})
        return
    }

    let users = []
    for(const userId of ketch._doc.users){
        user = null
        try{
            user = await userSchema.findOne({
                _id: userId
            })
        }catch(err){

        }
        
        if(user === null){
            res.status(400).send({message:"Error getting user"})
            return
        }
        users.push(user._doc)
    }
    ketch._doc.users = users
    res.status(200).send({message:ketch._doc})
});

// join ketch
// TODO: client needs to connect to websocket
app.put('/ketch/join', async (req, res) => {
    let ketch = null
    try{
        ketch = await ketchSchema.findOne({
            joincode: req.body.joinCode
        })
    }catch(err){
        
    }
    if (ketch === null){
        res.status(400).send({message:"Ketch not found"})
        return
    }
    if (ketch._doc.users.includes(req.body.userId)){
        res.status(201).send({message:ketch._doc._id})
        return
    }
    if (ketch._doc.status !== "SCHEDULED"){
        res.status(400).send({message:"Ketch is not available for scheduling"})
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
    res.status(201).send({message:ketch._doc._id})
});

// update ketch when swiping
app.put('/ketch/swipe', async (req, res) => {
    let ketch = null
    console.log(req.body)
    try{
        ketch = await ketchSchema.findOne({
            _id: req.body.ketchId
        })
    }catch(err){
        
    }
    if (ketch === null){
        res.status(400).send({message:"Ketch not found"})
        return
    }

    if(req.body.dir == "right"){
        try{
            await ketchSchema.findOneAndUpdate({
                _id: req.body.ketchId
            },{
                $push: {
                    [`preference.${req.body.hangoutId}.votes`]: req.body.userId
                }
            })
        }catch(err){
    
        }
    }
    if(req.body.dir == "left"){
        try{
            await ketchSchema.findOneAndUpdate({
                _id: req.body.ketchId
            },{
                $push: {
                    [`preference.${req.body.hangoutId}.voteNo`]: req.body.userId
                }
            })
        }catch(err){
    
        }
    }
    
    
    if(!ketch._doc.swiped.includes(req.body.userId)){
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
    res.status(204).send({message:ketch._doc._id})
});


// plan the sketch (complete the planning phase)
// TODO: multicast message to websockets
app.put('/ketch/plan', async (req, res) => {
    console.log(req.body)
    let ketch = null
    try{
        ketch = await ketchSchema.findOne({
            _id: req.body.ketchId
        })
    }catch(err){
        
    }
    if (ketch === null){
        res.status(400).send({message:"Ketch not found"})
        return
    }
    if (ketch._doc.status !== "SCHEDULED"){
        res.status(400).send({message:"Incorrect ketch status"})
        return
    }
    let preference = ketch._doc.preference
    let activity = Object.keys(preference).map(elem => [preference[elem].length, elem]).sort().reverse()[0][1]
    await ketchSchema.updateOne({
        _id: req.body.ketchId
    },{
        $set: {
            status: "PLANNED",
            activity: {
                name: preference[activity].name,
                pic: preference[activity].pic,
                address: preference[activity].address
            }
        }
    })
    try{
        ketch = await ketchSchema.findOne({
            _id: req.body.ketchId
        })
    }catch(err){
        
    }
    res.status(201).send({message:ketch._doc})
});

// complete the ketch (upload photo)
app.post('/ketch/complete/:ketchId', upload.single('photo'), async (req, res) => {
    let ketch = null
    console.log("in")
    try{
        ketch = await ketchSchema.findOne({
            _id: req.params.ketchId
        })
    }catch(err){
        
    }
    if (ketch === null){
        res.status(400).send({message:"Ketch not found"})
        return
    }
    if (ketch._doc.status !== "PLANNED"){
        res.status(400).send({message:"Incorrect ketch status"})
        return
    }
    
    await ketchSchema.updateOne({
        _id: req.params.ketchId
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
    try{
        ketch = await ketchSchema.findOne({
            _id: req.params.ketchId
        })
    }catch(err){
        
    }
    console.log({message:ketch._doc})
    res.status(201).send({message:ketch._doc})
});
