import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = ()=> ({
    register: async (name, email, password) => {
        const response = await api.post('/register', {name, email, password});
        return response.data
    },
    signin: async (email, password) => {
        const response = await api.post('/login', { email, password });
        return response.data;
    },
    addTransaction: async (
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
        ) => {
            const response = await api.post('/transaction',
            {
                type, 
                description, 
                value, 
                date,
                paymentDate,
                Tstatus,
                category,
                account,
                acountDestination
            },
            {headers:{'Authorization': `Bearer ${localStorage.getItem('authToken')}`}}
            )
    },
    validateToken: async (token) => {
        const response = await api.post("/validateToken", { token });
        return response.data;
    },
    statementResumeApp: async () => {
        let response = await api.get('/statementResume', {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    getIncome: async () => {
        let response = await api.get('/income', {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    getExpense: async () => {
        let response = await api.get('/expense', {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    getAccounts: async ()=>{
        let response = await api.get('/account', {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    getAccountid: async (id) => {
        let response = await api.get(`/account/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    newAccount: async (title)=>{
        await api.post('/account', {title}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    removeAccount: async (id) => {
        await api.delete(`account/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    updateAccount: async (id, title) => {
        await api.put(`/account/${id}`, {title}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    getCategories: async () =>{
        let response = await api.get('/categories', {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data;
    },
    newCategory: async (title)=>{
        await api.post('/category', {title}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    getCategoryId: async (id) => {
        let response = await api.get(`/category/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    removeCategory: async (id) => {
        await api.delete(`category/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    updateCategory: async (id, title) => {
        await api.put(`/category/${id}`, {title}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    createSubCategory: async (id, subCat) => {
        await api.put(`/subcategory/${id}`, {subCat}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    getStatementForMonth: async (date, account, category) => {
        let response = await api.post('/statementMonth', {date, account, category}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data;
    },
    getIncomeMonth: async (date, account, category) => {
        let response = await api.post('/statementIncome', {date, account, category}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data;
    },
    getExpenseMonth: async (date, account, category) => {
        let response = await api.post('/statementExpense', {date, account, category}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data;
    },
    getIncomeProfit: async (account) => {
        let response = await api.post('/incomeProfit', {account}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    getExpenseProfit: async (account) => {
        let response = await api.post('/expenseProfit', {account}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    getBillsToPay: async () => {
        let response = await api.get('/billsToPay', {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    updateBillsToPay: async (id, account, value, paymentDate, Tstatus) => {
        let response = await api.put(`/billsToPay/${id}`, {account, value, paymentDate, Tstatus}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    getBillsToReceive: async () => {
        let response = await api.get('/billsToReceive', {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    getBillsId: async (id) => {
        let response = await api.get(`/bills/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
        return response.data
    },
    updateBillsToReceive: async (id, account, value, paymentDate, Tstatus) => {
        let response = await api.put(`/billsToReceive/${id}`, {account, value, paymentDate, Tstatus}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    reverseTransaction: async (id) => {
        let response = await api.put(`/reverseTransaction/${id}`, {Tstatus: false}, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    },
    deleteTransaction: async (id) => {
        let response = await api.delete(`/deleteTransaction/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}})
    }

});