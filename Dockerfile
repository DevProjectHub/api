FROM node:18-alpine AS dependencies

RUN corepack enable

WORKDIR /api

COPY --chown=node:node ./package*.json ./
COPY --chown=node:node ./pnpm-lock.yaml ./

RUN pnpm i -P

COPY --chown=node:node . .

RUN npx prisma generate

USER node

#####################

FROM node:18-alpine AS build

RUN corepack enable

WORKDIR /api

COPY --chown=node:node --from=dependencies /api/node_modules ./node_modules

COPY --chown=node:node tsconfig.json package*.json nest-cli.json ./

COPY --chown=node:node /src ./src

COPY --chown=node:node /prisma ./prisma/

ENV NODE_ENV production
RUN pnpm run build

USER node

#####################

FROM node:18-alpine AS production

WORKDIR /api

COPY --chown=node:node --from=build /api/node_modules ./node_modules

COPY --chown=node:node --from=build /api/dist ./dist

COPY --chown=node:node --from=build /api/prisma ./prisma

COPY --chown=node:node --from=build /api/package*.json ./

CMD ["/bin/sh", "-c", "npx prisma migrate deploy;node dist/main.js"]
