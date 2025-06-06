const API_BASE = 'http://localhost:3000/api'; // Use a URL do seu backend no Railway e o prefixo /api

export interface Session {
  id: string;
  horario: string;
  preco: number;
  capacidade: number;
  ingressosVendidos: number;
  filmeId: string;
  salaId: string;
}

export interface SessionFormDTO {
  horario: string;
  preco: number;
  capacidade: number;
  filmeId: string;
  salaId: string;
  ingressosVendidos?: number;
}

export const api = {
  getSessions: async (): Promise<Session[]> => {
    const response = await fetch(`${API_BASE}/sessions`);
    if (!response.ok) throw new Error('Erro ao buscar sessões.');
    return response.json();
  },

  createSession: async (data: SessionFormDTO): Promise<Session> => {
    const response = await fetch(`${API_BASE}/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao criar sessão.');
    return response.json();
  },

  updateSession: async (id: string, data: SessionFormDTO): Promise<Session> => {
    const response = await fetch(`${API_BASE}/sessions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erro ao atualizar sessão.');
    return response.json();
  },

  deleteSession: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/sessions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar sessão.');
  },
  
  purchaseTicket: async (id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE}/sessions/${id}/purchase`, {
      method: 'POST',
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao processar compra.');
    }
    return response.json();
  }
};