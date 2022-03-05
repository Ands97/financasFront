import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    
    const [token, setToken] = useState(null);
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
            return true
        }
        return false;
    }

    const signout = async (email, password) => {
        await api.logout();
        setToken(null)
    }

    const setTokenLocal = (token) => {
        localStorage.setItem('authToken', token)
    }

    return(
        <AuthContext.Provider value={{
           token,
           signin,
           signout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
