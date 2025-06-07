import { SessionModel, ISession } from '../models/session.models.js';

type CreateSessionDTO = Omit<ISession, '_id' | 'createdAt' | 'updatedAt' | 'id'>;

export const sessionRepository = {
  findAll: async (): Promise<ISession[]> => {
    return SessionModel.find().lean();
  },

  findById: async (id: string): Promise<ISession | null> => {
    return SessionModel.findById(id).lean();
  },

  create: async (data: CreateSessionDTO): Promise<ISession> => {
    const newSession = new SessionModel(data);
    return newSession.save();
  },

  update: async (id: string, data: Partial<ISession>): Promise<ISession | null> => {
    return SessionModel.findByIdAndUpdate(id, data, { new: true }).lean();
  },

  delete: async (id: string): Promise<ISession | null> => {
    return SessionModel.findByIdAndDelete(id).lean();
  },
  
  purchaseTicket: async (id: string): Promise<ISession | null> => {
    return SessionModel.findByIdAndUpdate(
      id, 
      { $inc: { ingressosVendidos: 1 } },
      { new: true }
    ).lean();
  }
};