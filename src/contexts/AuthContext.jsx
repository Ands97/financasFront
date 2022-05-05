import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    
    const [user, setUser] = useState(null)
    const api = useApi()


    const signin = async (email, password) => {
        const data = await api.signin(email, password);
        if (data.token && data.user) {
            setToken(data.token);
            setUser(data.user);
        }
    };

    const signout = () => {
        setUser(null);
        setToken("");
    };

    const setToken = (token) => {
        localStorage.setItem("authToken", token);
    };

    const register = async (name, email, password) => {
        const data = await api.register(name, email, password);
        if(data.token){
            setToken(data.token);
            setUser(data.user)
            return true
        }
        setToken(null)
    }

    const validateToken = async () => {
        const storageData = localStorage.getItem("authToken");
        if (storageData) {
            const data = await api.validateToken(storageData);
            if (data.user) {
                setUser(data.user);
            }
        }
    };
    
    useEffect(() => {
        validateToken()
}, [])

    return(
        <AuthContext.Provider value={{
           signin,
           register,
           user,
           signout
        }}>
            {children}
        </AuthContext.Provider>
    )
}
