FROM node:17-alpine as base
WORKDIR /usr/share/app
COPY package.json /usr/share/app
RUN npm install
COPY . /usr/share/app
EXPOSE 3001

FROM base as start
CMD npm run start

FROM base as dev
CMD npm run start