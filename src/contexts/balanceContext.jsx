import { createContext, useState } from "react";

export const BalanceContext = createContext({});

export const BalanceProvider = ({children})=>{
    const [income, setIncome] = useState(50.50);
    const [expense, setExpense] = useState(28.50);
    const [showAddTransaction, setShowAddTransaction] = useState(false)
    
    const handleAddAction = ()=>{
        setShowAddTransaction(true)
    }

    return(
        <BalanceContext.Provider value={{
            income,
            expense,
            setShowAddTransaction,
            showAddTransaction,
            handleAddAction
        }}>
            {children}
        </BalanceContext.Provider>
    )
}
