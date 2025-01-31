import axios from 'axios';
import ContractType from '@/types/Contract';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/contract',
  headers: { 'Content-Type': 'application/json' }
});

const apiService = {
  postContract: async (endpoint: string, data: ContractType) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição POST:', error);
      throw error;
    }
  },

  deleteContract: async (endpoint: string, data: ContractType) => {
    try {
      const response = await api.delete(endpoint, {
        data
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição DELETE:', error);
      throw error;
    }
  },

  getContracts: async (endpoint: string, type: number, userId: number) => {
    try {
      const response = await api.get(`${endpoint}/${type}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição GET:', error);
      throw error;
    }
  },
};

export default apiService;