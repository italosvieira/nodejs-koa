# Demo project using Node.js and Koa.js.

[![Author](http://img.shields.io/badge/Author-@italosvieira-purple.svg?style=flat-square)](https://www.linkedin.com/in/italosvieira/)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://github.com/italosvieira/nodejs-koa/blob/master/LICENSE)

## Getting started
This is a demo REST API using only JavaScript with async/await and koajs.

## How to run

### Using Docker Compose
This will start a mongo database, mongo-express and the service. Run on root folder of the project project.

```
docker-compose up
```

## Generating Asymmetric Keys
Running this on root folder of the project will generate default keys to run the server in develop mode.

```
openssl genrsa -out AsymmetricPrivateKey.pem 2048

openssl rsa -in AsymmetricPrivateKey.pem -pubout > AsymmetricPublicKey.pem
```

### Running in development mode
Installing all project dependencies.

```
npm i
```

Parameters to run the server.

```
PATH_ASYMMETRIC_PUBLIC_KEY
PATH_ASYMMETRIC_PRIVATE_KEY
NODE_PORT
NODE_ENV
MONGO_URL
MONGO_USER
MONGO_PASSWORD
```

Running without default parameters.

```
npm start
``` 

Running with default parameters.

```
npm run server
``` 

Formatting code

```
npm run lint
```

## Usage

Testing if application is running correctly. This will return a hello world.

```
GET http://localhost:3000
```

This will authenticate you and return a JWT.

```
POST http://localhost:3000/api/public/auth/token
Content-Type: application/json

{
  "email": "admin@email.com",
  "password": "admin"
}
```

A secure route that returns some objects from mongo. If you try to access this route without a token it wil return e 401 Unauthorized.

```
GET http://localhost:3000/api/private/fruits
Authorization: Bearer token
```

## Project Structure

```
├── Dockerfile
├── docker-compose.yml
├── package.json
├── package-lock.json
├── scripts
│   └── mongo
│       └── seed.js
└── src
    ├── config
    │   ├── asymmetricKeysLoader.js
    │   ├── environmentVariablesValidator.js
    │   ├── mongoose.js
    │   └── winston.js
    ├── exceptions
    │   └── businessException.js
    ├── middleware
    │   ├── exceptionHandler.js
    │   └── jwt.js
    ├── models
    │   ├── fruit.js
    │   └── user.js
    ├── routes
    │   ├── auth-router.js
    │   ├── fruit-router.js
    │   ├── home-router.js
    │   ├── private-router.js
    │   ├── public-router.js
    │   └── user-router.js
    ├── server.js
    ├── services
    │   ├── auth-service.js
    │   ├── fruit-service.js
    │   ├── home-service.js
    │   └── user-service.js
    └── utils
        └── validateMongoId.js
```

## TODO

 - Middleware with roles and permissions.
 - Unit test.
 - Review all code.