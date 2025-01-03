# Base image
FROM node:20.18.1-alpine AS base
RUN addgroup -S backend && \
    adduser -S backend -G backend
RUN npm install -g pnpm
WORKDIR /app
EXPOSE 3000

#----------------------------------------------------------------

# Build layer
FROM base AS build
COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.build.json ./ 
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY ./src ./src
RUN pnpm build --webpack

#----------------------------------------------------------------

# Production layer
FROM base AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./ 
ENTRYPOINT ["node", "dist/main.js"]
