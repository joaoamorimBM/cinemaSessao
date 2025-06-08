import mongoose, { Schema, Document } from 'mongoose';

export interface ISessao extends Document {
  filmeId: string;
  dataHora: Date;
  sala: string;
  preco: number;
  assentosDisponiveis: number;
}

const SessaoSchema: Schema = new Schema({
  filmeId: { type: String, required: true },
  dataHora: { type: Date, required: true },
  sala: { type: String, required: true },
  preco: { type: Number, required: true },
  assentosDisponiveis: { type: Number, required: true },
}, {
  timestamps: true,
  collection: 'sessoes'
});

export default mongoose.model<ISessao>('Sessao', SessaoSchema);