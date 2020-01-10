export default {
    Query: {
        me(_, __, { user, update }) {
            if (!user) update({ status: 403 });

            return user;
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

            id ? update({ id }) : update({ status: 400 });

            return err;
        },
        async login(_, args, { dataSources: { playerAPI }, update }) {
            const { id, err } = await playerAPI.login(args);

            id ? update({ id }) : update({ status: 400 });

            return err;
        },
        logout(_, __, { update }) {
            update({ id: null });

            return null;
        },
        async submit(_, { flag }, { dataSources: { playerAPI, taskAPI }, user, update }) {
            if (!user) {
                update({ status: 403 });

                return null;
            }

            let task = await taskAPI.find(flag);

            if (!task) return { success: false };
            if (user.tasks.indexOf(task.id) > -1) return { success: true };

            const me = {
                ...user,
                tasks: [...user.tasks, task.id],
                score: user.score + task.value
            };

            let res = playerAPI.solve(user.id, me.tasks, me.score);

            if (!res) return { success: false };

            return { success: true, tasks: [task], me };
        }
    }
};
