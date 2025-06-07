import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
// Cria um pool de conexões, que é mais eficiente
const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
console.log('MySQL conectado com sucesso.');
export default pool;
