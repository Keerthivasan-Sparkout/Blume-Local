# Dockerfile

FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Install required packages
RUN apk add --no-cache openssl

# Only copy package.json to leverage Docker cache
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies (including devDependencies)
RUN npm install

# Copy app source code
COPY . .

# Don't run build or generate here — in dev, these happen on start
CMD ["npm", "run", "start:dev"]
