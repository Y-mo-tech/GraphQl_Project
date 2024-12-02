# Step 1: Set the base image
FROM node:16

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the source code
COPY ./src /usr/src/app/src

# Step 6: Expose the port your app runs on
EXPOSE 8000

# Step 7: Start the app
CMD ["npm", "run", "start"]
