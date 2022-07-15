FROM node:16.16.0 as deps
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn

FROM node:16.16.0 as build
ENV NODE_ENV production
WORKDIR /app
COPY --from=deps /app .
COPY ./src ./src
COPY ./webpack.config.js .
COPY ./tsconfig.json .
RUN yarn build

FROM node:16.16.0 as run
ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000
WORKDIR /app
COPY --from=build /app/dist/server.js ./dist/server.js
COPY ./package.json .
CMD ["yarn", "start"]
