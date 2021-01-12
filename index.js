const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB_URL } = require('./config.js');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

async function sayHello() {
    console.log('Hello!');
}

async function connectDB() {
    await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('DB connected');
}

async function runServer() {
    const pubsub = new PubSub();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req, pubsub })
    });
    const res = await server.listen({ port: 5000 });
    console.log(`Server running at ${res.url}`);
}

sayHello().then(connectDB).then(runServer);
