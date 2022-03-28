import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = ()=> ({
    signin: async (email, password) => {
        const response = await api.post('/login', { email, password });
        return response.data;
    },
    addTransaction: async (
        type, 
        description, 
        value, 
        date,
        Tstatus,
        category,
        account,
        token
        ) => {
            const response = await api.post('/transaction',
            {
                type, 
                description, 
                value, 
                date,
                Tstatus,
                category,
                account
            },
            {headers:{'Authorization': `Bearer ${token}`}}
            )
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
});