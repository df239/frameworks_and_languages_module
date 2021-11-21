FROM node:slim

WORKDIR /app/

COPY package.json .
RUN npm install
#COPY openapi.yml .

COPY . .

ENTRYPOINT ["npm", "start"]