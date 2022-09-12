#FROM node:18-alpine AS development
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN yarn install
#
#COPY . .
#
#RUN yarn build

FROM node:16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

COPY ./dist ./dist

CMD ["node", "dist/main"]