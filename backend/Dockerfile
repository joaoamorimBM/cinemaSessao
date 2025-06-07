FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache python3 make g++

# Limpar cache do npm
RUN npm cache clean --force

# Instalar TypeScript globalmente
RUN npm install -g typescript

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto dos arquivos
COPY . .

# Executar o build
RUN npm run build

# Imagem de produção
FROM node:20-alpine

WORKDIR /app

# Copiar apenas os arquivos necessários da imagem de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instalar apenas dependências de produção
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"] 