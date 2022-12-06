FROM node:18

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy src files
COPY . .

# compilation
RUN npx tsc 

# expose ports
EXPOSE 5174

# run server
CMD [ "node", "src/index.js" ]
