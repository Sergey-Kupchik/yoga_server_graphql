import { GraphQLServer } from "graphql-yoga"
import { Query, Posts, User, Picture } from "./graphql/resolvers/index"
import axios from "axios"

const basedURL = "http://localhost:3004";

const server = new GraphQLServer({
    typeDefs: "./src/graphql/schema.graphql",
    resolvers: {
        Query,
        Posts,
        User,
        Picture,
    }
})

server.start(() => {
    console.log("and running running ")
})