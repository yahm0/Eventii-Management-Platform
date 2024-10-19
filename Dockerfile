# Use the official Node.js image as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy and install root dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the frontend
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
