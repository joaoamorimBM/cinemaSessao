"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = require("../controllers/session.controller");
const router = (0, express_1.Router)();
router.post('/sessions', session_controller_1.sessionController.createSession);
router.get('/sessions', session_controller_1.sessionController.getAllSessions);
router.get('/sessions/:id', session_controller_1.sessionController.getSessionById);
router.put('/sessions/:id', session_controller_1.sessionController.updateSession);
router.delete('/sessions/:id', session_controller_1.sessionController.deleteSession);
// Rota Bônus
router.post('/sessions/:id/purchase', session_controller_1.sessionController.purchaseTicket);
exports.default = router;
