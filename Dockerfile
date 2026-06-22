# Multi-stage build for Next.js with Payload CMS



# Stage 1: Dependencies

FROM node:20-slim AS deps

WORKDIR /app



COPY package.json package-lock.json* ./

RUN npm i

# Stage 2: Builder

FROM node:20-slim AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG TURSO_DATABASE_URL
ARG TURSO_AUTH_TOKEN
ARG PAYLOAD_SECRET
ENV TURSO_DATABASE_URL=$TURSO_DATABASE_URL
ENV TURSO_AUTH_TOKEN=$TURSO_AUTH_TOKEN
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET

# Build the application

ENV NEXT_TELEMETRY_DISABLED=1

ENV NODE_ENV=production

RUN npm run build



# Stage 3: Runner

FROM node:20-slim AS runner

WORKDIR /app



ENV NODE_ENV=production

ENV NEXT_TELEMETRY_DISABLED=1

ENV PORT=3000

ENV HOSTNAME="0.0.0.0"



# Create non-root user (Debian-style)

RUN groupadd -r nodejs -g 1001 && useradd -r nextjs -u 1001 -g nodejs



# Copy necessary files

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./

COPY --from=builder /app/.next/static ./.next/static



# Payload specific

COPY --from=builder /app/payload.config.ts ./

COPY --from=builder /app/collections ./collections

COPY --from=builder /app/app ./app



# Create data and media directories with proper permissions

RUN mkdir -p /app/data /app/media && chown -R nextjs:nodejs /app/data /app/media

VOLUME ["/app/media"]



# Set permissions

RUN chown -R nextjs:nodejs /app



USER nextjs



EXPOSE 3000



CMD ["node", "server.js"]

