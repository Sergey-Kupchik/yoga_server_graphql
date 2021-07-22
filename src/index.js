import axios from "axios"
import { GraphQLServer } from "graphql-yoga"

const server = new GraphQLServer({
    typeDefs: `
    type Query {
        agent (id:ID!): User!,
        agents: [User!]!,
        multiply (value:Int!): Int!
    }
    type User {
        id: ID!
        name: String!
        age: Int!
        married: Boolean! 
        average: Float!
        status: String!
    }
    `,
    resolvers: {
        Query: {
            agent: async (parent, args, context, info) => {
                const response = await (await axios.get(`http://localhost:3004/users/${args.id}`)).data
                return response
            },
            agents: async () => {
                const response = await (await axios.get(`http://localhost:3004/users/`)).data
                return response
            },
            multiply: async (parent, args, context, info) => {
                const response = args.value*204
                return response
            },
        }
    }
})

server.start(() => {
    console.log("and running running ")
})