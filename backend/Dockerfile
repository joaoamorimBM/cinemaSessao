FROM node:20-alpine

WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache python3 make g++

# Limpar cache do npm
RUN npm cache clean --force

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências com --no-cache
RUN npm install --no-cache

# Copiar o resto dos arquivos
COPY . .

# Executar o build
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 