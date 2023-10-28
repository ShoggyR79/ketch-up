import { View, Text } from 'react-native'
import React, { createContext, useEffect } from 'react'

const AuthContext = createContext({})

import {API_LINK} from '../env'
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const handleLogin = async (email, password) => {
        // call api to login
        const response = await fetch(API_LINK + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        // 200 successful, 400 incorrect
        const data = await response.json()
        if (response.status === 200) {
            setUser(data)
            return {status: 'success', data}
        } else {
            // handle error
            return {status: 'error', message}
        }
    }
    
    return (
        <AuthContext.Provider value={{
            user,
            handleLogin,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return React.useContext(AuthContext)
}