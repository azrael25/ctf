import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';
import * as auth from './auth';
import * as db from './db';
import { PlayerAPI } from './datasources/player';
import { TaskAPI } from './datasources/task';

// User config
const config = {
    secret: '123abc',
    score: {
        type: 'dynamic',
        base: 1000,
        step: 50,
        min: 0.1
    }
};

auth.init(config.secret);

!async function() {
    const { models: { tasks, players } } = await db.connect(),
        defaultPort = 4000;

    const playerAPI = new PlayerAPI({ db: players, secret: config.secret });

    const context = async ({ req, res }) => {
        const { id } = auth.decode(req?.headers?.authorization),
            user = await playerAPI.find(id);

        return {
            user,
            config,
            update({ id, status }) {
                id && res?.set('authorization', auth.encode(id));
                id === null && res?.removeHeader('authorization');
                status && res?.status(status);
            }
        };
    };

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
        dataSources: () => ({
            playerAPI,
            taskAPI: new TaskAPI({ db: tasks })
        })
    });

    const app = await server.listen({
        port: process.env.PORT || defaultPort
    });

    console.log(`🚀 Server ready at ${app.url}`);
}();
