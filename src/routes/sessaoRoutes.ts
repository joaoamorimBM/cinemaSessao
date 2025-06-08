import { Router } from 'express';
import { body } from 'express-validator';
import { criarSessao, listarSessoes, buscarSessaoPorId, deletarSessao } from '../controllers/sessaoController';

const router = Router();

const validacaoSessao = [
  body('filmeId').isString().notEmpty().withMessage('O ID do filme é obrigatório.'),
  body('dataHora').isISO8601().withMessage('A data e hora devem estar no formato ISO8601.'),
  body('sala').isString().notEmpty().withMessage('A sala é obrigatória.'),
  body('preco').isFloat({ gt: 0 }).withMessage('O preço deve ser um número maior que zero.'),
  body('assentosDisponiveis').isInt({ gt: 0 }).withMessage('O número de assentos deve ser um inteiro maior que zero.')
];

router.post('/', validacaoSessao, criarSessao);

router.get('/', listarSessoes);

router.get('/:id', buscarSessaoPorId);

router.delete('/:id', deletarSessao);

export default router;