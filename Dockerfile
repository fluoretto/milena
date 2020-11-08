FROM node:alpine

ENV PORT 4000
EXPOSE 4000

WORKDIR /usr/app/backend

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build

CMD ["yarn", "start"]