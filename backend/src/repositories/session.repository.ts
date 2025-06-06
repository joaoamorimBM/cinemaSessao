import pool from '../database.js';
import { Session } from '../types/session.type';

// Omit é um utilitário do TypeScript que cria um tipo omitindo certas chaves.
// Usamos aqui para dizer que na criação não precisamos do 'id'.
type CreateSessionDTO = Omit<Session, 'id'>;

export const sessionRepository = {
  findAll: async (): Promise<Session[]> => {
    const [rows] = await pool.query('SELECT * FROM Session');
    return rows as Session[];
  },

  findById: async (id: number): Promise<Session | null> => {
    const [rows] = await pool.query('SELECT * FROM Session WHERE id = ?', [id]);
    if ((rows as Session[]).length === 0) {
      return null;
    }
    return (rows as Session[])[0];
  },

  create: async (data: CreateSessionDTO): Promise<Session> => {
    const { horario, preco, capacidade, filmeId, salaId } = data;
    const ingressosVendidos = 0;
    const sql = 'INSERT INTO Session (horario, preco, capacidade, ingressosVendidos, filmeId, salaId) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [horario, preco, capacidade, ingressosVendidos, filmeId, salaId];
    
    const [result] = await pool.query(sql, values);
    const insertId = (result as any).insertId;
    
    return { id: insertId, ...data, ingressosVendidos };
  },

  update: async (id: number, data: Partial<Session>): Promise<boolean> => {
    const { horario, preco, capacidade, filmeId, salaId, ingressosVendidos } = data;
    const sql = 'UPDATE Session SET horario = ?, preco = ?, capacidade = ?, ingressosVendidos = ?, filmeId = ?, salaId = ? WHERE id = ?';
    const values = [horario, preco, capacidade, ingressosVendidos, filmeId, salaId, id];

    const [result] = await pool.query(sql, values);
    return (result as any).affectedRows > 0;
  },

  delete: async (id: number): Promise<boolean> => {
    const [result] = await pool.query('DELETE FROM Session WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  },
  
  purchaseTicket: async (id: number): Promise<boolean> => {
    const sql = 'UPDATE Session SET ingressosVendidos = ingressosVendidos + 1 WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    return (result as any).affectedRows > 0;
  }
};