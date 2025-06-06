import React from 'react';
import { Clock, DollarSign, Users, Film, MapPin, Edit2, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import type { Session } from '../services/api';


interface Props {
  session: Session;
  loading: boolean;
  onEdit: (session: Session) => void;
  onDelete: (id: string) => void;
  onPurchase: (id: string) => void;
}

const formatDateTime = (dateTime: string) => new Date(dateTime).toLocaleString('pt-BR');
const getOccupancyPercentage = (vendidos: number, capacidade: number) => ((vendidos / capacidade) * 100).toFixed(1);
const getOccupancyColor = (percentage: number) => {
  if (percentage >= 90) return 'text-red-600 bg-red-100';
  if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
  return 'text-green-600 bg-green-100';
};

export const SessionCard: React.FC<Props> = ({ session, loading, onEdit, onDelete, onPurchase }) => {
  const occupancyPercentage = parseFloat(getOccupancyPercentage(session.ingressosVendidos, session.capacidade));
  const isSoldOut = session.ingressosVendidos >= session.capacidade;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-blue-600" />
            <span className="font-semibold text-gray-900">{formatDateTime(session.horario)}</span>
          </div>
          <div className="flex gap-2">
            <button aria-label="Editar Sessão" onClick={() => onEdit(session)} disabled={loading} className="p-1 text-blue-600 hover:bg-blue-100 disabled:text-blue-300 rounded">
              <Edit2 size={16} />
            </button>
            <button aria-label="Deletar Sessão" onClick={() => onDelete(session.id)} disabled={loading} className="p-1 text-red-600 hover:bg-red-100 disabled:text-red-300 rounded">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2"><DollarSign size={16} className="text-green-600" /><span className="text-gray-700">R$ {session.preco.toFixed(2)}</span></div>
          <div className="flex items-center gap-2"><Film size={16} className="text-purple-600" /><span className="text-gray-700">Filme: {session.filmeId}</span></div>
          <div className="flex items-center gap-2"><MapPin size={16} className="text-orange-600" /><span className="text-gray-700">Sala: {session.salaId}</span></div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-600" />
            <span className="text-gray-700">{session.ingressosVendidos}/{session.capacidade}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOccupancyColor(occupancyPercentage)}`}>{occupancyPercentage}%</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button onClick={() => onPurchase(session.id)} disabled={isSoldOut || loading} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors text-sm">
          {isSoldOut ? 'Lotado' : loading ? 'Processando...' : 'Comprar Ingresso'}
        </button>
      </div>
    </div>
  );
};