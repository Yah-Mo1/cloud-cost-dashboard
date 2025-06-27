# Multi-stage Dockerfile for Vite React Application

# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
# RUN npm ci --only=production=false
COPY . .
RUN npm run build



# Stage 2: Production stage
FROM node:18-alpine AS production
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./dist


# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
# Change ownership
RUN chown -R nextjs:nodejs /app
# Switch to non-root user
USER nextjs
# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start serve (Vite builds to 'dist' folder)
CMD ["serve", "-s", "dist", "-l", "3000"]


