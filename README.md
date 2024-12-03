GraphQL Application
This is a simple GraphQL API that allows user registration, login, and retrieval of user details. The application is designed for easy scalability and maintainability.

Features:-
- User Registration: Create a new user by providing an email, password, and role.
- User Login: Authenticate an existing user using their email and password.
- Get All Users: Retrieve a list of all registered users.
- Get User by ID: Fetch details of a specific user by their unique ID.


Getting Started
Prerequisites:-
Ensure you have the following installed on your machine:

Docker (for containerization)
Node.js (for local development)
Installation
Clone the repository:

git clone https://github.com/Y-mo-tech/GraphQl_Project.git

Install dependencies:

npm install
Running the Application
Using Docker
Build and start the application using Docker Compose:-

docker-compose up

Access the GraphQL Playground at:

http://localhost:8000/graphql


Using Node.js
Start the application:-

npm run start


Access the GraphQL Playground at:-

http://localhost:8000/graphql


API Endpoints
Queries:-

Get All Users:-

graphql
query GetAllUsers {
  getAllUsers {
    id
    email
    role
  }
}

Get User by ID:-

graphql
query GetUser {
  getUser(id: "USER_ID") {
    id
    email
    role
  }
}

Mutations

Register User:-

graphql
mutation RegisterUser {
  registerUser(email: "example@example.com", password: "password123", role: "USER_ROLE")
}

Login User:-

graphql
mutation LoginUser {
  login(email: "example@example.com", password: "password123")
}


Folder Structure:-

src: Contains the application code, including GraphQL schema, resolvers, and services.
docker-compose.yml: Docker Compose configuration file.
package.json: Dependency and script configuration for Node.js.


Technologies Used :-

GraphQL: API query language.
Node.js: Backend runtime environment.
Docker: Containerization.
Apollo Server: For building GraphQL APIs.