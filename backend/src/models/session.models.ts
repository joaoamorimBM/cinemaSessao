import { Schema, model, Document } from 'mongoose';

// A interface define a "forma" do nosso documento para o TypeScript
export interface ISession extends Document {
  horario: Date;
  preco: number;
  capacidade: number;
  ingressosVendidos: number;
  filmeId: string;
  salaId: string;
}

// O Schema define a estrutura e as regras para o MongoDB
const sessionSchema = new Schema<ISession>(
  {
    horario: { type: Date, required: true },
    preco: { type: Number, required: true },
    capacidade: { type: Number, required: true },
    ingressosVendidos: { type: Number, default: 0 },
    filmeId: { type: String, required: true },
    salaId: { type: String, required: true },
  },
  {
    timestamps: true, // Adiciona os campos `createdAt` e `updatedAt` automaticamente
  }
);

// O Modelo é a nossa porta de entrada para executar operações na coleção 'sessions'
export const SessionModel = model<ISession>('Session', sessionSchema);