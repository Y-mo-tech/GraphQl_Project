import {gql} from "apollo-server-express"

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    role: String!
  }

  type Query {
    getUser(id: ID): User
    getAllUsers: [User]
  }

  type Mutation {
    registerUser(email : String!, password: String!, role: String!): String
    login(email : String!, password: String!): String
  }
`

