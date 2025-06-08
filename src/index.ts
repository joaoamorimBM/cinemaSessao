// src/index.ts
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/db';
import sessaoRoutes from './routes/sessaoRoutes';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

connectDB();

app.use(cors());       
app.use(express.json());

// Rotas da API
app.use('/sessoes', sessaoRoutes);


app.get('/', (req, res) => {
  res.send('API do Microserviço de Sessões está no ar!');
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor de Sessões rodando na porta ${PORT}`);
});