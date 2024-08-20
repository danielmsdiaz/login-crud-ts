import axios from "axios";

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws',
    headers: { 'Content-Type': 'application/json' }
  });

const fetchAddressByCep = async (cep: string) => {
    try {
        const response = await api.get(`${cep}/json/`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar o CEP');
    }
};

export default fetchAddressByCep;