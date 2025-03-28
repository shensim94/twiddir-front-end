### STAGE 1: BUILD ###
FROM node:18 AS builder

WORKDIR /app

COPY . .

# Build with the production configuration
RUN npm install && npm run ng build -- --configuration=production

### STAGE 2: SERVE ###
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*
COPY --from=builder /app/dist/my-twitter-frontend/browser/* .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
