# multi-stage docker-build for building the typescript project
FROM node:18-alpine AS builder

WORKDIR /build

COPY . .

RUN yarn install
RUN yarn build

# main docker
FROM node:16-alpine3.16

ENV PRODUCTION=true
ENV NODE_ENV=production

WORKDIR /app

# copy package files
COPY --from=builder /build/package.json /app/package.json
COPY --from=builder /build/yarn.lock /app/yarn.lock

# install ONLY production dependencies
RUN yarn install --frozen-lockfile --prod && yarn cache clean

# copy compiled files from previous docker-build-stage
COPY --from=builder /build/dist /app/dist
# copy template files to render views
COPY --from=builder /build/src/templates/ /app/src/templates/

EXPOSE 3000

CMD ["node", "/app/dist/src/index.js"]
