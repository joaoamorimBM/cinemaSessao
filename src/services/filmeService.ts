import axios from 'axios';
import dotenv from 'dotenv';
import { Filme } from '../types/Filme';

dotenv.config();

const filmeServiceApi = axios.create({
  baseURL: process.env.FILME_SERVICE_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const buscarFilmePorId = async (id: string): Promise<Filme | null> => {
  try {
    console.log(`[FilmeService] Tentando buscar filme com ID ${id}`);
    console.log(`[FilmeService] URL base: ${process.env.FILME_SERVICE_URL}`);
    
    const response = await filmeServiceApi.get<Filme>(`/filmes/listar/id/${id}`);
    
    if (response.status === 200 && response.data && response.data.id) {
      console.log(`[FilmeService] Filme encontrado com sucesso: ${response.data.titulo}`);
      return response.data;
    }
    
    console.log('[FilmeService] Filme não encontrado ou resposta inválida');
    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('[FilmeService] Erro detalhado:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
        headers: error.config?.headers,
        timeout: error.config?.timeout
      });
    } else {
      console.error('[FilmeService] Erro desconhecido:', error);
    }
    return null;
  }
};