export interface Session {
  id: number;
  horario: string;
  preco: number;
  capacidade: number;
  ingressosVendidos: number;
  filmeId: number;
  salaId: number;
}