FROM node:20.18.1-alpine AS base
RUN addgroup -S backend && \
    adduser -S backend -G backend
WORKDIR /app
EXPOSE 3000
RUN npm install -g --ignore-scripts pnpm

#--------------------------------------------------

FROM base AS build
COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY ./src ./src
RUN pnpm build --webpack

#--------------------------------------------------

FROM base AS production
ARG NODE_ENV=production
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod --ignore-scripts && \
    pnpm cache delete
COPY --from=build /app/dist ./
USER backend
ENTRYPOINT ["node", "main.js"]
