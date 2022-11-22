FROM node:18-alpine3.16
WORKDIR /base
COPY package.json .
COPY yarn.lock .
COPY ./packages/common ./packages/common
COPY ./packages/server/package.json packages/server/package.json
RUN yarn install --frozen-lockfile
COPY ./packages/server packages/server
CMD ["yarn", "start:server"]