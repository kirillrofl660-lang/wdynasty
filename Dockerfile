# Multi-stage build for Next.js with Payload CMS

# Stage 1: Dependencies
FROM node:20-slim AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Stage 2: Builder
FROM node:20-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

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

# Payload specific (runtime needs config + collections + types)
COPY --from=builder /app/payload.config.ts ./
COPY --from=builder /app/collections ./collections
COPY --from=builder /app/payload-types.ts ./
COPY --from=builder /app/theme.ts ./

# Create data directory for SQLite with proper permissions
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Set permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
