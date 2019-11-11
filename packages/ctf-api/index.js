import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';

const defaultPort = 4000;

const server = new ApolloServer({
    typeDefs,
    resolvers
});

!async function() {
    const app = await server.listen({
        port: process.env.PORT || defaultPort
    });

    console.log(`🚀 Server ready at ${app.url}`);
}();
