import { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";

export const BalanceContext = createContext({});

export const BalanceProvider = ({children})=>{
    const api = useApi()
    
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    const [statementResume, setStatementResume] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    
    
    const handleAddAction = ()=>{
        setShowAddTransaction(true)
    }
    const getResume = async ()=>{
        const data = await api.statementResumeApp();
        setStatementResume(data)
    }
    const getIncome = async () => {
        const data = await api.getIncome()
        setIncome(data)
    }
    const getExpense = async () => {
        const data = await api.getExpense()
        setExpense(data)
    }
    
    return(
        <BalanceContext.Provider value={{
            setShowAddTransaction,
            showAddTransaction,
            handleAddAction,
            getResume,
            statementResume,
            getIncome,
            income,
            getExpense,
            expense
        }}>
            {children}
        </BalanceContext.Provider>
    )
}
