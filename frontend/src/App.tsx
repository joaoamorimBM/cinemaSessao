import React, { useState, useEffect } from 'react';
import { Plus, Film } from 'lucide-react';
import { api } from './services/api';
import type { Session, SessionFormDTO } from './services/api';

import { SessionCard } from './components/sessionCard ';
import { SessionFormModal } from './components/sessionFormModal';

const INITIAL_FORM_STATE: SessionFormDTO = {
  horario: '',
  preco: 0,
  capacidade: 0,
  filmeId: '',
  salaId: ''
};

const App = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<SessionFormDTO>(INITIAL_FORM_STATE);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getSessions();
      setSessions(data);
    } catch (err) {
      handleError(err, 'Erro ao carregar sessões. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err: unknown, defaultMessage: string) => {
    console.error(defaultMessage, err);
    const message = err instanceof Error ? err.message : defaultMessage;
    setError(message);
  }

  const handleFormSubmit = async () => {
    if (!formData.horario || !formData.preco || !formData.capacidade || !formData.filmeId || !formData.salaId) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (editingSession) {
        await api.updateSession(editingSession.id, { ...formData, ingressosVendidos: editingSession.ingressosVendidos });
      } else {
        await api.createSession(formData);
      }
      resetFormAndFetch();
    } catch (err) {
      handleError(err, 'Erro ao salvar sessão.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta sessão?')) return;
    
    setLoading(true);
    try {
      await api.deleteSession(id);
      setSessions(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      handleError(err, 'Erro ao deletar sessão.');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (id: string) => {
    setLoading(true);
    try {
      const result = await api.purchaseTicket(id);
      alert(result.message);
      fetchSessions(); // Recarrega para ver a contagem de ingressos atualizada
    } catch (err) {
      handleError(err, 'Erro ao processar compra.');
    } finally {
      setLoading(false);
    }
  };

  const resetFormAndFetch = () => {
    setFormData(INITIAL_FORM_STATE);
    setEditingSession(null);
    setShowForm(false);
    setError('');
    fetchSessions();
  };

  const handleOpenForm = (session: Session | null = null) => {
    setError('');
    if (session) {
      setEditingSession(session);
      setFormData({
        horario: session.horario.substring(0, 16), // Formato para datetime-local
        preco: session.preco,
        capacidade: session.capacidade,
        filmeId: session.filmeId,
        salaId: session.salaId
      });
    } else {
      setEditingSession(null);
      setFormData(INITIAL_FORM_STATE);
    }
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sistema de Gerenciamento - Cinema</h1>
          <p className="text-gray-600">Gerencie suas sessões de cinema</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span>{error}</span>
            <button aria-label="Fechar alerta" onClick={() => setError('')} className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        )}

        <div className="mb-6 flex justify-between items-center">
          <button onClick={() => handleOpenForm()} disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={20} /> Nova Sessão
          </button>
          <div className="text-sm text-gray-500">Total de sessões: {sessions.length}</div>
        </div>

        <SessionFormModal 
          show={showForm}
          loading={loading}
          editingSessionId={editingSession?.id || null}
          formData={formData}
          onFormChange={setFormData}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />

        {loading && sessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando sessões...</p>
          </div>
        ) : sessions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                loading={loading}
                onEdit={handleOpenForm}
                onDelete={handleDelete}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        ) : !error && (
          <div className="text-center py-12">
            <Film size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma sessão encontrada</h3>
            <p className="text-gray-600 mb-6">Comece criando sua primeira sessão de cinema</p>
            <button onClick={() => handleOpenForm()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2">
              <Plus size={20} /> Nova Sessão
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;