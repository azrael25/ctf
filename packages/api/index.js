import { ApolloServer } from 'apollo-server';
import { init } from '@ctf/db';
import typeDefs from './schema';
import resolvers from './resolvers';
import { decode } from './auth';
import { seeds } from './seeds';

const { instance, ...db } = init(),
    defaultPort = 4000;

if (process.env.DEV) {
    seeds(instance, db);
}

const context = async ({ req }) => {
    let { id } = decode(req?.headers?.authorization),
        user = await db.players.findByPk(id);

    user && (user = user.dataValues);

    return { user };
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
