import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { buscarFilmePorId } from '../services/filmeService';
import sessaoRepository from "../repositories/sessaoRepository";

export const criarSessao = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { filmeId, dataHora, sala, preco, assentosDisponiveis } = req.body;

    try {
      const filme = await buscarFilmePorId(filmeId);
      if (!filme) {
        res.status(404).json({ message: `Filme com ID ${filmeId} não encontrado.` });
        return;
      }
      if (!filme.disponivel) {
        res.status(400).json({ message: `O filme '${filme.titulo}' não está disponível para novas sessões.`});
        return;
      }

    const novaSessao = await sessaoRepository.create({
      filmeId,
      dataHora: new Date(dataHora),
      sala,
      preco,
      assentosDisponiveis
    });

    res.status(201).json(novaSessao);

  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar sessão', error });
  }
};

// export const listarSessoes = async (req: Request, res: Response) => {
//   try {
//     console.log('Iniciando busca de sessões...');
//     const sessoes = await sessaoRepository.findAll();
//     console.log(`Encontradas ${sessoes.length} sessões`);
//     res.status(200).json(sessoes);
//   } catch (error) {
//     console.error('Erro detalhado ao listar sessões:', error);
//     if (error instanceof Error) {
//       res.status(500).json({ 
//         message: 'Erro ao listar sessões', 
//         error: error.message,
//         stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//       });
//     } else {
//       res.status(500).json({ message: 'Erro ao listar sessões', error: 'Erro desconhecido' });
//     }
//   }
// };

export const listarSessoes = async (req: Request, res: Response) => {
  try {
    console.log('Iniciando busca de sessões...');
    const sessoes = await sessaoRepository.findAll();

    // mapeia cada sessão para uma Promise que busca os detalhes do filme
    const sessoesComFilmes = await Promise.all(
      sessoes.map(async (sessao) => {
        const filme = await buscarFilmePorId(sessao.filmeId);
        return {
          ...sessao.toObject(),
          filme: filme || { message: "Detalhes do filme não disponíveis." }
        }
      })
    )

    console.log(`Encontradas ${sessoesComFilmes.length} sessões`);
    res.status(200).json(sessoesComFilmes);
  } catch (error) {
    console.error('Erro detalhado ao listar sessões:', error);
    if (error instanceof Error) {
      res.status(500).json({ 
        message: 'Erro ao listar sessões', 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    } else {
      res.status(500).json({ message: 'Erro ao listar sessões', error: 'Erro desconhecido' });
    }
  }
};

export const buscarSessaoPorId = async (req: Request, res: Response) => {
  try {
    
    const sessao = await sessaoRepository.findById(req.params.id);
    if (!sessao) {
      res.status(404).json({ message: 'Sessão não encontrada.' });
      return;
    }

    const filme = await buscarFilmePorId(sessao.filmeId);

    const resposta = {
      ...sessao.toObject(),
      filme: filme || { message: "Detalhes do filme não disponíveis." }
    };

    res.status(200).json(resposta);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar sessão', error });
  }
};

export const deletarSessao = async (req: Request, res: Response) => {
    try {
        
        const sessaoDeletada = await sessaoRepository.deleteById(req.params.id);
        if(!sessaoDeletada) {
            res.status(404).json({ message: 'Sessão não encontrada.' });
            return;
        }
        res.status(200).json({ message: "Sessão deletada com sucesso."});
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar sessão', error });
    }
};