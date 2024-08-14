import axios from 'axios';
import WorkoutType from '@/types/Workout';

const api = axios.create({
  baseURL: 'http://localhost:4000/api/personal',
  headers: { 'Content-Type': 'application/json' }
});

const apiService = {
  getWorkouts: async (endpoint: string, personalId: number) => {
    try {
      const response = await api.get(`${endpoint}/${personalId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição GET:', error);
      throw error;
    }
  },

  postWorkout: async (endpoint: string, data: WorkoutType) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição POST:', error);
      throw error;
    }
  },

  deleteWorkout: async (endpoint: string, workoutId: number) => {
    try {
      const response = await api.delete(`${endpoint}/${workoutId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição DELETE:', error);
      throw error;
    }
  },

  editWorkout: async (endpoint: string, workoutId: number, data: WorkoutType) => {
    try {
      const response = await api.put(`${endpoint}/${workoutId}`, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer requisição DELETE:', error);
      throw error;
    }
  },

};

export default apiService;