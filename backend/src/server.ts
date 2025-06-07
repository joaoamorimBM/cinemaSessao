import app from './app.js';
import { connectToDatabase } from './database.js'; // 1. Importamos a sua função de conexão

const PORT = process.env.PORT || 3000;

// Criamos uma função principal "async" para poder usar "await"
const startServer = async () => {
  // 2. Primeiro, executa a conexão com o banco e espera ela terminar
  await connectToDatabase();
  
  // 3. Apenas depois da conexão bem-sucedida, inicia o servidor Express
  app.listen(PORT, () => {
    console.log(`🚀 Servidor de Sessões rodando na porta ${PORT}`);
  });
};

// 4. Executamos a função principal que inicia tudo
startServer();