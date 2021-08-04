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
    getAnumal: async (parent, args, context, info) => {
        let response;
        let random = Math.floor(Math.random() * 6) + 1;
        if (random >= 3) {
            response = {
                type: "Dog",
                name: "Jeri",
                hair: "Grey"
            }
        } else {
            response = {
                type: "Cat",
                name: "Tiha",
                paws: true
            }
        }
        return response;
    },
};

// const Animal = {
const AnimalInterface = {
    __resolveType: (obj, content, info) => {
        if (obj.hair) {
            return "Dog";
        } else if (obj.paws) {
            return "Cat";
        } else {
            return Error;
        }
    }
}

const Mutation = {
    createAgent: async (parent, args, context, info) => {

        // get avarage from somthing else 

        const response = await (await axios.post(`${basedURL}/users`, {
            name: args.data.name,
            age: args.data.age,
            married: args.data.married,
            status: "active",
            average: 3.9
        })).data;
        return response;
    },
    createPost: async (parent, args, context, info) => {
        const { title, content, author } = args
        // get token = user id 

        const response = await (await axios.post(`${basedURL}/posts`, {
            title: title,
            content: content,
            author: author,
            picture: 23
        })).data;
        return response;
    },

    deletePost: async (parent, args, context, info) => {
        const response = await axios.delete(`${basedURL}/posts/${args.id}`)
        if (Object.keys(response.data).length === 0) {
            return true
        }
        else {
            throw Error;
        }
    },
    deleteAgent: async (parent, args, context, info) => {
        const response = await axios.delete(`${basedURL}/users/${args.id}`)
        if (Object.keys(response.data).length === 0) {

            return true
        }
        else {
            throw Error;
        }
    },
    changeAgent: async (parent, args, context, info) => {
        let data = {};
        if (args.name) { data.name = args.name };
        if (args.age) { data.age = args.age };
        if (args.married) { data.name = args.married };
        const response = await (await axios.patch(`${basedURL}/users/${args.id}`, data)).data;
        return response
    },
}

const Post = {
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
    Mutation,
    AnimalInterface,
    Post,
    User,
    Picture,
}