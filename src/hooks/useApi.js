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
        token
        ) => {
            const response = await api.post('/transaction',
            {
                type, 
                description, 
                value, 
                date,
                Tstatus
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
});