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
        }
    };

    const [user, setUser] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('userId').then((value) => {
            setUser(value);
        })
    }, [])
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userId');
        setUser(null)
    }

    const handleLogin = async (email, password) => {
        // call api to login
        console.log(API_LINK + '/user/login')
        const response1 = await fetch(API_LINK)
        console.log(response1)
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
        if (response.status === 201) {
            console.log(data)
            setUser(data)
            storeId(data) // store to localHost
            return { status: 'success', userId: data }
        } else {
            // handle error
            return { status: 'error', message: data }
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