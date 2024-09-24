FROM node:18 AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-slim AS runner

WORKDIR /app

COPY --from=build /app/dist ./dist

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
