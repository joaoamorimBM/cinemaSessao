FROM node:20-alpine

WORKDIR /app

# Instalar dependências necessárias
RUN apk add --no-cache python3 make g++

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto dos arquivos
COPY . .

# Verificar se o TypeScript está instalado
RUN npm list typescript

# Executar o build
RUN /usr/local/bin/npm run build

EXPOSE 3000

CMD ["npm", "start"] 