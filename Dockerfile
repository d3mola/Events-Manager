FROM node:8.11.1

ENV NODE_ENV=development

RUN mkdir -p  /usr/src/app
WORKDIR /usr/src/app


COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . . 

EXPOSE 8080

CMD ["npm", "start"]