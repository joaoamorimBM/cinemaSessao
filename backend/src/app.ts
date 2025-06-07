import express from 'express';
import cors from 'cors'; // 1. Importamos o cors
import sessionRoutes from './routes/session.routes.js';

const app = express();

// 2. Usamos o middleware de CORS. Ele libera o acesso para requisições de outras origens.
// Deve vir ANTES de qualquer outra configuração de rota.
app.use(cors()); 

// Nossos outros middlewares
app.use(express.json());

// Nossas rotas
app.use('/api', sessionRoutes);

export default app;