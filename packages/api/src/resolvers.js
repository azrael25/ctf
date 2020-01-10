import * as auth from './auth';

export default {
    Query: {
        me(_, __, { user, update }) {
            if (!user) {
                update({ status: 403 });

                return null;
            }

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                validated: user.validated,
                tasks: JSON.parse(user.tasks),
                score: user.score
            };
        },
        tasks(_, __, { dataSources: { taskAPI }, user, update }) {
            if (!user) {
                update({ status: 403 });

                return null;
            }

            return taskAPI.list(JSON.parse(user.tasks));
        },
        scoreboard(_, __, { dataSources: { playerAPI }, user, update }) {
            if (!user) {
                update({ status: 403 });

                return null;
            }

            return playerAPI.list();
        }
    },

    Mutation: {
        async signup(_, args, { dataSources: { playerAPI }, update }) {
            const { id, err } = await playerAPI.signup(args);

            id ?
                update({ token: auth.encode(id) }) :
                update({ status: 400 });

            return err;
        },
        async login(_, args, { dataSources: { playerAPI }, update }) {
            const { id, err } = await playerAPI.login(args);

            id ?
                update({ token: auth.encode(id) }) :
                update({ status: 400 });

            return err;
        },
        logout(_, __, { update }) {
            update({ token: null });

            return null;
        }
    }
};
