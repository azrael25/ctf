import { ApolloServer } from 'apollo-server';
import { connect } from '@ctf/db';
import typeDefs from './schema';
import resolvers from './resolvers';
import * as auth from './auth';
import { PlayerAPI } from './datasources/player';
import { TaskAPI } from './datasources/task';

// Need to be auto-generated for each installation
const secret = '123abc';

auth.init(secret);

!async function() {
    const { tasks, players } = await connect(),
        defaultPort = 4000;

    const playerAPI = new PlayerAPI({ db: players, secret });

    const context = async ({ req, res }) => {
        const { id } = auth.decode(req?.headers?.authorization),
            user = await playerAPI.find(id);

        return {
            user,
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
