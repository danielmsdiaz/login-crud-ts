import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', 
  headers: { 'Content-Type': 'application/json' }
});

const apiService = {
    // getData: async (endpoint: string, data: {email: string, password: string}) => {
    //   try {
    //     const response = await api.get(endpoint, {
    //       params: data
    //     });
    //     return response.data;
    //   } catch (error) {
    //     console.error('Erro ao fazer requisição GET:', error);
    //     throw error;
    //   }
    // },

    postData: async (endpoint: string, data: {name?: string, email: string, password: string}) => {
      try {
        const response = await api.post(endpoint, data);
        return response.data;
      } catch (error) {
        console.error('Erro ao fazer requisição POST:', error);
        throw error;
      }
    },
  };
  
  export default apiService;