# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies and vite for preview
RUN npm install --production && npm install vite

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/vite.config.ts ./

# Expose port
EXPOSE 5173

# Start the application in preview mode
CMD ["npm", "run", "preview"]
