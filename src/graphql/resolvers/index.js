import axios from "axios"

const basedURL = "http://localhost:3004";


const Query = {
    agent: async (parent, args, context, info) => {
        const response = await (await axios.get(`${basedURL}/users/${args.id}`)).data;
        return response;
    },
    agents: async (parent, args, context, info) => {
        let name = args.name != null ? `name=${args.name}` : "";
        let age = args.age != null ? `age=${args.age}` : "";
        const response = await (await axios.get(`${basedURL}/users?${name}&${age}`)).data;
        return response;
    },
    posts: async () => {
        const response = await (await axios.get(`${basedURL}/posts`)).data;
        return response;
    },
    post: async (parent, args, context, info) => {
        const response = await (await axios.get(`${basedURL}/posts/${args.id}`)).data;
        return response;
    },
    pictures: async () => {
        const response = await (await axios.get(`${basedURL}/pictures`)).data;
        return response;
    },
    picture: async (parent, args, context, info) => {
        const response = await (await axios.get(`${basedURL}/pictures/${args.id}`)).data;
        return response;
    },
};

const Posts = {
    author: async (parent, args, context, info) => {
        const response = await (await axios.get(`${basedURL}/users/${parent.author}`)).data;
        return response;
    },
    picture: async (parent, args, context, info) => {
        const response = await (await axios.get(`${basedURL}/pictures/${parent.picture}`)).data;
        return response;
    },
};

const User = {
    posts: async (parent, args, context, info) => {
        const response = await (await axios.get(`${basedURL}/posts?author=${parent.id}`)).data;
        return response;
    },
    pictures: async (parent, args, context, info) => {
        const response = await (await axios.get(`${basedURL}/pictures?author=${parent.id}`)).data;
        return response;
    },
};

const Picture = {
    post: async (parent, args, context, info) => {
        const response = await (await axios.get(`${basedURL}/posts/${parent.post}`)).data;
        return response;
    },
    author: async (parent, args, context, info) => {
        const response = await (await axios.get(`${basedURL}/users/${parent.author}`)).data;
        return response;
    }
};



export {
    Query,
    Posts,
    User,
    Picture,
}