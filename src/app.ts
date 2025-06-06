import express, { Request, Response } from 'express';
import pool from './database';

const app = express();
app.use(express.json());

// --- ROTAS DO CRUD CORRIGIDAS ---

// CREATE: Cria uma nova sessão
app.post('/sessions', async (req: Request, res: Response): Promise<any> => {
  try {
    const { horario, preco, capacidade, filmeId, salaId } = req.body;
    const ingressosVendidos = 0;

    const sql = 'INSERT INTO Session (horario, preco, capacidade, ingressosVendidos, filmeId, salaId) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [horario, preco, capacidade, ingressosVendidos, filmeId, salaId];
    
    const [result] = await pool.query(sql, values);
    const insertId = (result as any).insertId;
    
    return res.status(201).json({ 
        id: insertId.toString(),
        horario,
        preco,
        capacidade,
        ingressosVendidos,
        filmeId,
        salaId
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar sessão.' });
  }
});

// READ: Busca todas as sessões
app.get('/sessions', async (req: Request, res: Response): Promise<any> => {
  try {
    const [rows] = await pool.query('SELECT * FROM Session');
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar sessões.' });
  }
});

// READ: Busca uma sessão por ID
app.get('/sessions/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Session WHERE id = ?', [id]);
    
    if ((rows as any[]).length === 0) {
      return res.status(404).json({ message: 'Sessão não encontrada.' });
    }
    return res.status(200).json((rows as any[])[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar sessão.' });
  }
});

// UPDATE: Atualiza uma sessão
app.put('/sessions/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { horario, preco, capacidade, filmeId, salaId, ingressosVendidos } = req.body;
        
        const sql = 'UPDATE Session SET horario = ?, preco = ?, capacidade = ?, ingressosVendidos = ?, filmeId = ?, salaId = ? WHERE id = ?';
        const values = [horario, preco, capacidade, ingressosVendidos, filmeId, salaId, id];

        const [result] = await pool.query(sql, values);

        if ((result as any).affectedRows === 0) {
            return res.status(404).json({ message: "Sessão não encontrada para atualizar." });
        }
        return res.status(200).json({ id, ...req.body });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar sessão.' });
    }
});

// DELETE: Apaga uma sessão
app.delete('/sessions/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM Session WHERE id = ?', [id]);

        if ((result as any).affectedRows === 0) {
            return res.status(404).json({ message: "Sessão não encontrada para deletar." });
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao deletar sessão.' });
    }
});


// ROTA BÔNUS: Comunicação para o serviço de Ingressos
app.post('/sessions/:id/purchase', async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT capacidade, ingressosVendidos FROM Session WHERE id = ?', [id]);
        const session = (rows as any[])[0];

        if (!session) return res.status(404).json({ message: 'Sessão não encontrada.' });
        if (session.ingressosVendidos >= session.capacidade) return res.status(400).json({ message: 'Sessão lotada!' });

        await pool.query('UPDATE Session SET ingressosVendidos = ingressosVendidos + 1 WHERE id = ?', [id]);
        return res.status(200).json({ message: 'Compra validada. Ingresso incrementado.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao processar compra.' });
    }
});

export default app;