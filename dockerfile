# Use Node 20 (with Corepack)
FROM node:20-alpine

# Enable Corepack and ensure it's ready in the same layer
RUN corepack enable && corepack prepare yarn@4.9.1 --activate

# Set working directory
WORKDIR /app

# Copy only package files (for caching)
COPY package.json yarn.lock* ./

# Install dependencies (Yarn v4)
RUN yarn install --immutable

# Copy rest of the app source
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start app in development mode
CMD ["yarn", "run", "start"]
