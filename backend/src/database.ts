import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Pega a URL de conexão do arquivo .env
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error('A variável de ambiente MONGO_URL não foi definida no arquivo .env');
}

// Função assíncrona para conectar ao banco
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    // Encerra o processo do Node.js se não conseguir conectar ao banco
    process.exit(1);
  }
};