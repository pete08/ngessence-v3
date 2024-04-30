# get base image: opensource AWS public img
FROM node:19-bullseye

# Set working Dir
WORKDIR /

# copy package and working directories  
COPY package.json package-lock.json ./

# Install dependencies
# RUN npm cache clean --force
RUN npm install

# Copy the rest of the application code to the working dir
COPY . . 

# Set an environment variable
ENV PORT=4000

# Expose the port that the app will run on 
EXPOSE 4000

# Tell docker to start the application
CMD ["npm", "start"]

# NOTE to build docker image:
    # $docker build -t ngessence:v3 . 
# NOTE to build docker container:
    # $docker run -d --name ngessencev3 -p 4000:4000 ngessence:v3    .....