import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolvers } from '../modules/user/user.resolver';

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: userResolvers,
});
