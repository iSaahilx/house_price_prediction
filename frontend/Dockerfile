# frontend/Dockerfile (production)
FROM node:18-bullseye-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Pass API URL as build arg if you want to bake it into the build
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# run stage: use lightweight static server
FROM node:18-bullseye-slim AS run
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
# Render sets $PORT environment variable when running container
ENV PORT 10000
EXPOSE 10000
CMD ["sh", "-c", "serve -s build -l ${PORT}"]
