# Étape 1 : Build de l'application TypeScript
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build


# Étape 2 : Exécution de l'application (utilisation de Debian Slim pour la compatibilité Chrome)
FROM node:22-slim AS runner
WORKDIR /app

# Installation des dépendances système requises par Chrome / Headless Shell
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    procps \
    libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Définition du dossier de cache de Puppeteer au sein du projet
ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer
ENV NODE_ENV=production

COPY package*.json ./
# L'installation va déclencher automatiquement votre script "postinstall" défini dans le package.json
RUN npm ci --only=production

# Copie du code compilé (ajustez 'dist' selon le dossier de sortie de votre tsc)
COPY --from=builder /app/dist ./dist

# Sécurité : On utilise l'utilisateur 'node' fourni par l'image plutôt que 'root'
USER node

EXPOSE 3000

CMD ["node", "dist/server.js"]
