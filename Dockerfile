FROM node:18-alpine

ENV PRODUCTION=true

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["node", "/app/dist/src/index.js"]