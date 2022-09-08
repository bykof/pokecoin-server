FROM node:16-alpine3.16

ENV PRODUCTION=true

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["node", "/app/dist/src/index.js"]