import express from 'express';
import sessionRoutes from '../src/routes/session.routes.js'; // Importa nossas rotas de sessão

const app = express();

// Aplica middlewares globais
app.use(express.json());

// Registra as rotas da aplicação sob um prefixo /api
// Agora suas rotas serão /api/sessions, /api/sessions/:id, etc.
app.use('/api', sessionRoutes);

// Você poderia registrar outras rotas aqui, como de filmes e ingressos
// import movieRoutes from './movies/movie.routes';
// app.use('/api', movieRoutes);


export default app;