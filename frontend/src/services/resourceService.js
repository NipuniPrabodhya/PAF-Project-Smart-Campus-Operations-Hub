import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const resourceService = {
    getAll: async (params) => {
        const response = await api.get('/resources', { params });
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/resources/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/resources', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/resources/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        await api.delete(`/resources/${id}`);
    }
};
