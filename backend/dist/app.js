"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_routes_js_1 = __importDefault(require("../src/routes/session.routes.js")); // Importa nossas rotas de sessão
const app = (0, express_1.default)();
// Aplica middlewares globais
app.use(express_1.default.json());
// Registra as rotas da aplicação sob um prefixo /api
// Agora suas rotas serão /api/sessions, /api/sessions/:id, etc.
app.use('/api', session_routes_js_1.default);
// Você poderia registrar outras rotas aqui, como de filmes e ingressos
// import movieRoutes from './movies/movie.routes';
// app.use('/api', movieRoutes);
exports.default = app;
