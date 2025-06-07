import { Schema, model } from 'mongoose';
// O Schema define a estrutura e as regras para o MongoDB
const sessionSchema = new Schema({
    horario: { type: Date, required: true },
    preco: { type: Number, required: true },
    capacidade: { type: Number, required: true },
    ingressosVendidos: { type: Number, default: 0 },
    filmeId: { type: String, required: true },
    salaId: { type: String, required: true },
}, {
    timestamps: true, // Adiciona os campos `createdAt` e `updatedAt` automaticamente
});
// O Modelo é a nossa porta de entrada para executar operações na coleção 'sessions'
export const SessionModel = model('Session', sessionSchema);
