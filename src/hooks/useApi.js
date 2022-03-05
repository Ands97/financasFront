import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = ()=> ({
    signin: async (email, password) => {
        const response = await api.post('/login', { email, password });
        return response.data;
    }
})