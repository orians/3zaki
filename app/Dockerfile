FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g npm@11.6.2
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-alpine
RUN npm install -g npm@11.6.2
WORKDIR /app
COPY --from=builder /app/.medusa/server /app
RUN npm ci --legacy-peer-deps --omit=dev
EXPOSE 9000
CMD ["npx", "medusa", "start"]
