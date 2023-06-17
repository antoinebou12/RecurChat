# Use a specific version of Node.js
FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Using wildcard to also include package-lock.json
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Set environment variable
ENV PORT=3000

# Expose the port the app runs on
EXPOSE $PORT

# Start the application
CMD [ "npm", "start" ]
