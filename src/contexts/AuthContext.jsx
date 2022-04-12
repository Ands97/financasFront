import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState('')
    const api = useApi()


    useEffect(() => {
            const storageData = localStorage.getItem('authToken');
            setToken(storageData)
    }, [])
    const signin = async (email, password) => {
        const data = await api.signin(email, password);
        if(data.token){
            setToken(data.token);
            setTokenLocal(data.token)
            setUsername(data.username)
            return true
        }
        return false;
    }

    const register = async (name, email, password) => {
        const data = await api.register(name, email, password);
        if(data.token){
            setToken(data.token);
            setTokenLocal(data.token)
            setUsername(data.username)
            return true
        }
        setToken(null)
    }

    const setTokenLocal = (token) => {
        localStorage.setItem('authToken', token)
    }

    return(
        <AuthContext.Provider value={{
           token,
           signin,
           register,
           username
        }}>
            {children}
        </AuthContext.Provider>
    )
}
