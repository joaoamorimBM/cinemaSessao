import pool from '../database.js';
export const sessionRepository = {
    findAll: async () => {
        const [rows] = await pool.query('SELECT * FROM Session');
        return rows;
    },
    findById: async (id) => {
        const [rows] = await pool.query('SELECT * FROM Session WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    },
    create: async (data) => {
        const { horario, preco, capacidade, filmeId, salaId } = data;
        const ingressosVendidos = 0;
        const sql = 'INSERT INTO Session (horario, preco, capacidade, ingressosVendidos, filmeId, salaId) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [horario, preco, capacidade, ingressosVendidos, filmeId, salaId];
        const [result] = await pool.query(sql, values);
        const insertId = result.insertId;
        return { id: insertId, ...data, ingressosVendidos };
    },
    update: async (id, data) => {
        const { horario, preco, capacidade, filmeId, salaId, ingressosVendidos } = data;
        const sql = 'UPDATE Session SET horario = ?, preco = ?, capacidade = ?, ingressosVendidos = ?, filmeId = ?, salaId = ? WHERE id = ?';
        const values = [horario, preco, capacidade, ingressosVendidos, filmeId, salaId, id];
        const [result] = await pool.query(sql, values);
        return result.affectedRows > 0;
    },
    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM Session WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },
    purchaseTicket: async (id) => {
        const sql = 'UPDATE Session SET ingressosVendidos = ingressosVendidos + 1 WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        return result.affectedRows > 0;
    }
};
