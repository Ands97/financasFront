import { createContext, useContext, useState } from "react";
import { useApi } from "../hooks/useApi";
import { AuthContext } from "./AuthContext";

export const TransactionContext = createContext({});

export const TransactionProvider = ({ children }) => {
    const api = useApi();
    const {token} = useContext(AuthContext);

    const addNewTransaction = async (
        type,
        description,
        value,
        date,
        Tstatus
        ) => {
            const data = await api.addTransaction(
                type,
                description,
                value,
                date,
                Tstatus,
                token
            );
    }

    return (
        <TransactionContext.Provider value={{
            addNewTransaction
            }}>
            {children}
        </TransactionContext.Provider>
    )
}