FROM node:10.15.3-alpine as buildPhase
RUN mkdir app
WORKDIR app
COPY package.json .
COPY package-lock.json .
COPY /src ./src
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install --production
RUN apk add --update openssl
RUN openssl genrsa -out AsymmetricPrivateKey.pem 2048
RUN openssl rsa -in AsymmetricPrivateKey.pem -pubout > AsymmetricPublicKey.pem

FROM node:10.15.3-alpine as app
COPY --from=buildPhase /app/node_modules /app/node_modules
COPY --from=buildPhase /app/src /app/src
COPY --from=buildPhase /app/AsymmetricPrivateKey.pem /app
COPY --from=buildPhase /app/AsymmetricPublicKey.pem /app
ENV MONGO_URL default
ENV MONGO_USER default
ENV MONGO_PASSWORD default
ENV NODE_ENV default
ENV NODE_PORT default
ENV PATH_ASYMMETRIC_PRIVATE_KEY default
ENV PATH_ASYMMETRIC_PUBLIC_KEY default
CMD ["node", "/app/src/server.js"]