FROM node:10.13.0-alpine
RUN mkdir app
WORKDIR app
ADD package.json .
ADD package-lock.json .
COPY src /app/src
RUN npm install --production
ENV MONGO_URL default
ENV MONGO_USER default
ENV MONGO_PASSWORD default
ENV NODE_ENV default
EXPOSE 3000
CMD ["sh", "-c", "node /app/src/server.js"]