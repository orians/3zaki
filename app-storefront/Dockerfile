FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g npm@11.6.2
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .

ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=$NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=$NEXT_PUBLIC_MEDUSA_BACKEND_URL
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_DEFAULT_REGION
ENV NEXT_PUBLIC_DEFAULT_REGION=$NEXT_PUBLIC_DEFAULT_REGION

RUN rm -rf src/app/studio
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/next.config.js /app/
COPY --from=builder /app/check-env-variables.js /app/
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules /app/node_modules
EXPOSE 8000
CMD ["npm", "run", "start"]
