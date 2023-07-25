FROM node:18-alpine AS dev
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .
RUN npm i
USER node
EXPOSE 3000
CMD [ "npm", "run", "dev" ]

FROM node:18-alpine AS prod
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY . ./
COPY --chown=node:node . .
RUN npm i --only=production
USER node
EXPOSE 3000
RUN npm run build
CMD [ "node", "./dist/index.js" ]
