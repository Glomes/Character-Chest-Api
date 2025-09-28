# Usa uma imagem base leve do Node.js
FROM node:20-alpine

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala as dependências (incluindo devDependencies para o ts-node-dev)
RUN npm install

# Copia o restante do código fonte
COPY . .

# Expõe a porta que o Express vai usar
EXPOSE 3000

# O comando inicial será sobrescrito pelo 'command' no docker-compose.yml
# CMD ["npm", "run", "start"]