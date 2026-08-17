FROM node:22-alpine AS backend-build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN npm run build

FROM node:22-alpine AS web-build
WORKDIR /app/web
COPY web/package.json ./
RUN npm install
COPY web ./
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4173
COPY --from=backend-build /app/dist ./dist
COPY --from=web-build /app/public ./public
COPY config ./config
COPY knowledge ./knowledge
EXPOSE 4173
CMD ["node", "dist/server.js"]
