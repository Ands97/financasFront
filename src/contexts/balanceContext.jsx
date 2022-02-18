import { createContext, useState } from "react";

export const BalanceContext = createContext({});

export const BalanceProvider = (props)=>{
    const [income, setIncome] = useState(50.50);
    const [expense, setExpense] = useState(28.50);
    

    return(
        <BalanceContext.Provider value={{
            income,
            expense,
        }}>
            {props.children}
        </BalanceContext.Provider>
    )
}
