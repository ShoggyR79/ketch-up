import { View, Text } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({})

import { API_LINK } from '../env'
export const AuthProvider = ({ children }) => {
    const storeId = async (id) => {
        try {
            await AsyncStorage.setItem('userId', id);
        } catch (e) {
            // saving error
            console.log("error")
        }
    };

    const [user, setUser] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('userId').then((value) => {
            console.log("grabbed " + value)
            setUser(value);
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userId');
        setUser(null)
    }

    const handleLogin = async (email, password) => {
        // call api to login
        await fetch(API_LINK + '/')
        console.log(API_LINK + '/user/login')
        const response = await fetch(API_LINK + '/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        console.log("return")
        // 200 successful, 400 incorrect
        const data = await response.json()
        // console.log(data)
        if (response.status === 201) {
            console.log(data)
            setUser(data)
            storeId(data) // store to localHost
            return { status: 'success', userId: data.message }
        } else {
            // handle error
            return { status: 'error', message: data.message }
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            handleLogin,
            handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return React.useContext(AuthContext)
}