
<!-- Overview
This project implements a real-time notification system leveraging GraphQL, Socket.IO, and TypeScript. The system supports user authentication and role-based communication in real-time, catering to different user roles like managers and admins. -->

<!-- Features
Authentication and Authorization:

Utilizes JWT for secure user login and role-based access control.
Ensures only authenticated users can access protected resources. -->

<!-- GraphQL API:

Supports user registration, login, and querying user-specific data.
Cleanly structured resolvers and typedefs ensure maintainability. -->

<!-- Real-Time Notifications:

Implements WebSocket communication with Socket.IO.
Supports role-based rooms where users receive updates relevant to their role.
Emits notifications for actions like new user registrations and logins. -->

<!-- TypeScript Integration:

Strong typing for resolvers, schemas, and Socket.IO logic.
Ensures code reliability and reduces runtime errors. -->

<!-- Database Integration:

MongoDB is used as the database with Mongoose as the ORM.
Models are defined for users and their roles. -->

<!-- Scalable Architecture:

Modular file structure for GraphQL API and WebSocket logic.
Easy to extend for additional roles and features. -->


<!-- Technology Stack
Backend Framework: Node.js
GraphQL Server: Apollo Server
WebSocket Library: Socket.IO
Database: MongoDB with Mongoose
Language: TypeScript -->


<!-- Workflow -->


<!-- GraphQL API

Users can register and log in via GraphQL mutations.
JWT is generated during login and used for authenticating subsequent requests.

WebSocket Communication
Upon successful login, users connect to the WebSocket server.
Based on their role, they join respective rooms (e.g., manager, admin).
Notifications are broadcast to relevant rooms for actions like:
A new user registering as a manager.
A manager logging in to the system. -->

<!-- Implementation Details -->


<!-- Authentication and Authorization
JWT-Based:

Tokens are generated upon login and stored securely on the client side.
The server validates tokens to identify the user and their role.

Socket Authentication:

WebSocket connections are authenticated by validating the JWT in the connection request.
Valid users are allowed to join specific rooms based on their role. -->

<!-- Real-Time Updates

Role-based rooms allow targeted communication:

Managers receive notifications relevant to their role.
Admins get updates for system-wide actions.

Key Events:

userLoggedIn: Broadcast when a user logs in and joins a room. -->

<!-- Folder Structure

src/
├── graphql/
│   ├── resolvers/
│   ├── typeDefs/
│   └── schema.ts
├── sockets/
│   ├── socketManager.ts
│   └── events.ts
├── middlewares/
│   └── authMiddleware.ts
├── utils/
│   ├── jwtUtils.ts
│   └── logger.ts
├── models/
│   └── userModel.ts
├── config/
│   └── env.ts
├── app.ts
└── server.ts -->

<!-- API Endpoints -->


<!-- GraphQL Operations

-- Register User:
Allows a new user to register with email, password, and role.
-- Login User:
Authenticates a user and returns a JWT token.
-- Query User:
Fetches user details based on authentication.
-- Query Users:
Fetches all user details based on authentication.


WebSocket Events

Connection:

Users are authenticated via the WebSocket middleware.
Authenticated users join rooms based on their role.

Event Broadcasts:

userLoggedIn: Sent to rooms when a user logs in. -->
