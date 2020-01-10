import { ApolloServer } from 'apollo-server';
import { initDB } from '@ctf/db';
import typeDefs from './src/schema';
import resolvers from './src/resolvers';
import * as auth from './src/auth';
import { PlayerAPI } from './src/datasources/player';
import { TaskAPI } from './src/datasources/task';
import { seeds } from './src/seeds';

// Need to be auto-generated for each installation
const secret = '123abc';

const { instance, tasks, players } = initDB('dbadmin', secret),
    defaultPort = 4000;

auth.init(secret);

if (process.env.DEV) {
    seeds(instance, { tasks, players });
}

const context = async ({ req, res }) => {
    const { id } = auth.decode(req?.headers?.authorization),
        user = await players.findByPk(id);

    return {
        user: user?.dataValues,
        update({ token, status }) {
            token && res?.set('authorization', token);
            token === null && res?.removeHeader('authorization');
            status && res?.status(status);
        }
    };
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    dataSources: () => ({
        playerAPI: new PlayerAPI({ db: players, secret }),
        taskAPI: new TaskAPI({ db: tasks })
    })
});

!async function() {
    const app = await server.listen({
        port: process.env.PORT || defaultPort
    });

    console.log(`🚀 Server ready at ${app.url}`);
}();
