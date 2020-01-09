import { ApolloServer } from 'apollo-server';
import { initDB } from '@ctf/db';
import typeDefs from './src/schema';
import resolvers from './src/resolvers';
import * as auth from './src/auth';
import { seeds } from './src/seeds';

// Need to be auto-generated for each installation
const secret = '123abc';

const { instance, ...db } = initDB('dbadmin', secret),
    defaultPort = 4000;

auth.init(secret);

if (process.env.DEV) {
    seeds(instance, db);
}

const context = async ({ req }) => {
    const { id } = auth.decode(req?.headers?.authorization),
        user = await db.players.findByPk(id);

    return { user: user?.dataValues };
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

!async function() {
    const app = await server.listen({
        port: process.env.PORT || defaultPort
    });

    console.log(`🚀 Server ready at ${app.url}`);
}();
