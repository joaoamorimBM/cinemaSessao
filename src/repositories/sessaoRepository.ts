import Sessao, { ISessao } from '../models/Sessao';

interface CreateSessaoData {
  filmeId: string;
  dataHora: Date;
  sala: string;
  preco: number;
  assentosDisponiveis: number;
}

class SessaoRepository {
  private readonly QUERY_TIMEOUT = 5000; // 5 seconds timeout

  async create(data: CreateSessaoData): Promise<ISessao> {
    const sessao = new Sessao(data);
    return await sessao.save();
  }

  async findAll(): Promise<ISessao[]> {
    return await Sessao.find()
      .maxTimeMS(this.QUERY_TIMEOUT)
      .exec();
  }

  async findById(id: string): Promise<ISessao | null> {
    return await Sessao.findById(id)
      .maxTimeMS(this.QUERY_TIMEOUT)
      .exec();
  }

  async deleteById(id: string): Promise<ISessao | null> {
    return await Sessao.findByIdAndDelete(id)
      .maxTimeMS(this.QUERY_TIMEOUT)
      .exec();
  }
}

export default new SessaoRepository();