import { Router } from 'express';
import { sessionController } from '../controllers/session.controller.js';
const router = Router();
router.post('/sessions', sessionController.createSession);
router.get('/sessions', sessionController.getAllSessions);
router.get('/sessions/:id', sessionController.getSessionById);
router.put('/sessions/:id', sessionController.updateSession);
router.delete('/sessions/:id', sessionController.deleteSession);
// Rota Bônus
router.post('/sessions/:id/purchase', sessionController.purchaseTicket);
export default router;
