FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
 

RUN npm i pnpm -g

RUN pnpm install

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]