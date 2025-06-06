export interface Session {
  id: number;
  horario: Date;
  preco: number;
  capacidade: number;
  ingressosVendidos: number;
  filmeId: string;
  salaId: string;
}