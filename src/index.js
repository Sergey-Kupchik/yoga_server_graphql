import axios from "axios"
import { GraphQLServer } from "graphql-yoga"

const basedURL = "http://localhost:3004"
const server = new GraphQLServer({
    typeDefs: `
    type Query {
        agent (id:ID!): User!
        agents (name:String, age:Int): [User!]
        posts: [Posts!]!
        post (id:ID!): Posts!
        pictures: [Picture!]!
        picture (id:ID!): Picture!
    }
    type User {
        id: ID!
        name: String!
        age: Int!
        married: Boolean! 
        average: Float!
        status: String!
        posts: [Posts!]!
        pictures: [Picture]!
    }
    type Posts {
        id: ID!
        title: String!
        content: String!
        author:  User! 
        picture: Picture!
        
    }
    type Picture {
        id: ID!
        path: String!
        post: Posts!
        author:  User! 
    }
    `,
    resolvers: {
        Query: {
            agent: async (parent, args, context, info) => {
                const response = await (await axios.get(`${basedURL}/users/${args.id}`)).data;
                return response
            },
            agents: async (parent, args, context, info) => {
                let name = args.name != null ? `name=${args.name}` : "";
                let age = args.age != null ? `age=${args.age}` : "";
                const response = await (await axios.get(`${basedURL}/users?${name}&${age}`)).data;
                return response
            },
            posts: async () => {
                const response = await (await axios.get(`${basedURL}/posts`)).data;
                return response
            },
            post: async (parent, args, context, info) => {
                const response = await (await axios.get(`${basedURL}/posts/${args.id}`)).data;
                return response
            },
            pictures: async () => {
                const response = await (await axios.get(`${basedURL}/pictures`)).data;
                return response
            },
            picture: async (parent, args, context, info) => {
                const response = await (await axios.get(`${basedURL}/pictures/${args.id}`)).data;
                return response
            },
        },
        Posts: {
            author: async (parent, args, context, info) => {
                const response = await (await axios.get(`${basedURL}/users/${parent.author}`)).data;
                return response
            },
            picture: async (parent, args, context, info) => {
                const response = await (await axios.get(`${basedURL}/pictures/${parent.picture}`)).data;
                return response
            },
        },
        User: {
            posts: async (parent, args, context, info) => {
                const response = await (await axios.get(`${basedURL}/posts?author=${parent.id}`)).data;
                return response
            },
            pictures: async (parent, args, context, info) => {
                const response = await (await axios.get(`${basedURL}/pictures?author=${parent.id}`)).data;
                return response
            },
        },
        Picture: {
            post: async (parent, args, context, info) => {
                const response = await (await axios.get(`${basedURL}/posts/${parent.post}`)).data;
                return response
            },
            author: async (parent, args, context, info) => {
                const response = await (await axios.get(`${basedURL}/users/${parent.author}`)).data;
                return response
            }
        }
    }
})

server.start(() => {
    console.log("and running running ")
})