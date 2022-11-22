FROM node:18-alpine3.16 as builder
WORKDIR /base
COPY package.json .
COPY yarn.lock .
COPY ./packages/common ./packages/common
COPY ./packages/ui/package.json packages/ui/package.json
RUN yarn install --frozen-lockfile
COPY ./packages/ui packages/ui
RUN yarn build:ui

FROM nginx:stable-alpine
ARG BUILD_CONTEXT
COPY --from=builder /base/packages/ui/dist /usr/share/nginx/html
COPY ./packages/ui/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]