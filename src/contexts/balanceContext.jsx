import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const BalanceContext = createContext({});

export const BalanceProvider = ({children})=>{
    const api = useApi()
    
    const [showAddTransaction, setShowAddTransaction] = useState(false)
    
    const handleAddAction = ()=>{
        setShowAddTransaction(true)
    }
    const getResume = async ()=>{
        const data = await api.statementResumeApp();
    }
    
    return(
        <BalanceContext.Provider value={{
            setShowAddTransaction,
            showAddTransaction,
            handleAddAction,
            getResume
        }}>
            {children}
        </BalanceContext.Provider>
    )
}
