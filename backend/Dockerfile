FROM node:10.13.0-alpine
ADD package.json .
ADD package-lock.json .
ADD src src/
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]