import { Request, Response } from 'express';
import { sessionRepository } from '../repositories/session.repository.js';

export const sessionController = {
  createSession: async (req: Request, res: Response): Promise<any> => {
    try {
      const newSession = await sessionRepository.create(req.body);
      return res.status(201).json(newSession);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar sessão.' });
    }
  },

  getAllSessions: async (req: Request, res: Response): Promise<any> => {
    try {
      const sessions = await sessionRepository.findAll();
      return res.status(200).json(sessions);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar sessões.' });
    }
  },

  getSessionById: async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id, 10);
      const session = await sessionRepository.findById(id);
      if (!session) {
        return res.status(404).json({ message: 'Sessão não encontrada.' });
      }
      return res.status(200).json(session);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao buscar sessão.' });
    }
  },

  updateSession: async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await sessionRepository.update(id, req.body);
      if (!success) {
        return res.status(404).json({ message: "Sessão não encontrada para atualizar." });
      }
      return res.status(200).json({ id, ...req.body });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar sessão.' });
    }
  },
  
  deleteSession: async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await sessionRepository.delete(id);
      if (!success) {
        return res.status(404).json({ message: "Sessão não encontrada para deletar." });
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar sessão.' });
    }
  },
  
  purchaseTicket: async (req: Request, res: Response): Promise<any> => {
    try {
      const id = parseInt(req.params.id, 10);
      const session = await sessionRepository.findById(id);

      if (!session) return res.status(404).json({ message: 'Sessão não encontrada.' });
      if (session.ingressosVendidos >= session.capacidade) return res.status(400).json({ message: 'Sessão lotada!' });

      await sessionRepository.purchaseTicket(id);
      return res.status(200).json({ message: 'Compra validada. Ingresso incrementado.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao processar compra.' });
    }
  },
};