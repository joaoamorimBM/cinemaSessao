import { SessionModel } from '../models/session.models.js';
export const sessionRepository = {
    findAll: async () => {
        return SessionModel.find().lean();
    },
    findById: async (id) => {
        return SessionModel.findById(id).lean();
    },
    create: async (data) => {
        const newSession = new SessionModel(data);
        return newSession.save();
    },
    update: async (id, data) => {
        return SessionModel.findByIdAndUpdate(id, data, { new: true }).lean();
    },
    delete: async (id) => {
        return SessionModel.findByIdAndDelete(id).lean();
    },
    purchaseTicket: async (id) => {
        return SessionModel.findByIdAndUpdate(id, { $inc: { ingressosVendidos: 1 } }, { new: true }).lean();
    }
};
