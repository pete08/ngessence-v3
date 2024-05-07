# get base image:
FROM node:19-bullseye

# Set the working directory in the container
WORKDIR /app

# Install OpenJDK
RUN apt-get update && apt-get install -y openjdk-11-jre-headless

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Tell docker to start the application
CMD ["node", "server.js"]



# NOTE to build docker image:
    # $docker build -t ngessence:v3ii .
# NOTE to build docker container:
    # $docker run -d --name ngessencev3ii -p 5000:5000 ngessence:v3ii    .....
