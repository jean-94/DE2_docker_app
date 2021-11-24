FROM node:14
WORKDIR /code
RUN npm install express
RUN npm install mysql2
COPY * ./
EXPOSE 5000
CMD ["node", "app.js"]