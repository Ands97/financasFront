import { createContext, useContext, useState } from "react";
import { useApi } from "../hooks/useApi";
import { AuthContext } from "./AuthContext";

export const TransactionContext = createContext({});

export const TransactionProvider = ({ children }) => {
    const api = useApi();
    const {token} = useContext(AuthContext);
    const [accounts, setAccounts] = useState([]);
    const [accountId, setAccountId] = useState([]);
    const [showModalAccount, setShowModalAccount] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [showModalCategory, setShowModalCategory] = useState(false);
    const [showModalBillsToPay, setShowModalBillsToPay] = useState(false);
    const [billsToPay, setBillsToPay] = useState([]);

    const addNewTransaction = async (
        type,
        description,
        value,
        date,
        paymentDate,
        Tstatus,
        category,
        account,
        acountDestination
        ) => {
            const data = await api.addTransaction(
                type,
                description,
                value,
                date,
                paymentDate,
                Tstatus,
                category,
                account,
                acountDestination,
                token
            );
    }
    const getAccounts = async () => {
        let list = await api.getAccounts()
        setAccounts(list);
    }
    const getCategories = async () => {
        let list = await api.getCategories();
        setCategories(list)
    }
    const getBillsToPay = async () => {
        const res = await api.getBillsToPay();
        setBillsToPay(res);
      };

    return (
        <TransactionContext.Provider value={{
            addNewTransaction,
            accounts,
            setAccounts,
            accountId,
            setAccountId,
            showModalAccount,
            setShowModalAccount,
            getAccounts,
            getCategories,
            categories,
            setCategories,
            showModalCategory,
            setShowModalCategory,
            categoryId,
            setCategoryId,
            showModalBillsToPay,
            setShowModalBillsToPay,
            billsToPay, 
            setBillsToPay,
            getBillsToPay
            }}>
            {children}
        </TransactionContext.Provider>
    )
}