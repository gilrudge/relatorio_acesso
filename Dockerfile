FROM node:16

RUN echo "Rodando"

WORKDIR /relatorio_acesso

COPY . .

RUN npm install

CMD npm start


