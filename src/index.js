import { GraphQLServer } from "graphql-yoga"
import { Query, Post, User, Picture, Mutation, AnimalInterface } from "./graphql/resolvers/index"

const basedURL = "http://localhost:3004";

const server = new GraphQLServer({
    typeDefs: "./src/graphql/schema.graphql",
    resolvers: {
        Query,
        Mutation,
        AnimalInterface,
        Post,
        User,
        Picture,
    }
})

server.start(() => {
    console.log("and running running ")
})