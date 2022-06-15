FROM node:lts-slim

EXPOSE 3000

COPY package.json /code/package.json

COPY yarn.lock /code/yarn.lock

WORKDIR /code

COPY . /code

RUN yarn

CMD yarn start