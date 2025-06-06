import React from 'react';

import { api } from '../services/api';
import type { SessionFormDTO } from '../services/api';

interface Props {
  show: boolean;
  loading: boolean;
  editingSessionId: string | null;
  formData: SessionFormDTO;
  onFormChange: (data: SessionFormDTO) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const SessionFormModal: React.FC<Props> = ({ show, loading, editingSessionId, formData, onFormChange, onSubmit, onClose }) => {
  if (!show) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    onFormChange({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">{editingSessionId ? 'Editar Sessão' : 'Nova Sessão'}</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="horario" className="block text-sm font-medium text-gray-700 mb-1">Horário *</label>
            <input id="horario" name="horario" type="datetime-local" value={formData.horario} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">Preço (R$) *</label>
            <input id="preco" name="preco" type="number" step="0.01" min="0" value={formData.preco} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="capacidade" className="block text-sm font-medium text-gray-700 mb-1">Capacidade *</label>
            <input id="capacidade" name="capacidade" type="number" min="1" value={formData.capacidade} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="filmeId" className="block text-sm font-medium text-gray-700 mb-1">ID do Filme *</label>
            <input id="filmeId" name="filmeId" type="text" value={formData.filmeId} onChange={handleChange} required placeholder="filme-001" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="salaId" className="block text-sm font-medium text-gray-700 mb-1">ID da Sala *</label>
            <input id="salaId" name="salaId" type="text" value={formData.salaId} onChange={handleChange} required placeholder="sala-01" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={onSubmit} disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 px-4 rounded-md transition-colors">
              {loading ? 'Salvando...' : editingSessionId ? 'Atualizar' : 'Criar'}
            </button>
            <button onClick={onClose} disabled={loading} className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 py-2 px-4 rounded-md transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};