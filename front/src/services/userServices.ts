import axios from 'axios';
import { PersonalProfileForm, GymMemberProfileForm } from '@/types/ProfileForm';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', 
  headers: { 'Content-Type': 'application/json' }
});

const apiService = {
    getPersonals: async (endpoint: string, type: number) => {
      try {
        const response = await api.get(`${endpoint}/${type}`);
        return response.data;
      } catch (error) {
        console.error('Erro ao fazer requisição GET:', error);
        throw error;
      }
    },

    postData: async (endpoint: string, data: {name?: string, email: string, password: string}) => {
      try {
        const response = await api.post(endpoint, data);
        return response.data;
      } catch (error) {
        console.error('Erro ao fazer requisição POST:', error);
        throw error;
      }
    },

    getLoggedUser: async (endpoint: string, id: number) => {
      try {
        const response = await api.get(`${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        console.error('Erro ao fazer requisição DELETE:', error);
        throw error;
      }
    },

    updateProfile: async (endpoint: string, id: number, type: number, data: PersonalProfileForm | GymMemberProfileForm) => {
      try {
        const response = await api.put(`${endpoint}/${type}/${id}`, data);
        return response.data;
      } catch (error) {
        console.error('Erro ao fazer requisição POST:', error);
        throw error;
      }
    },

  };
  
  export default apiService;