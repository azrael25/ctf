export default {
    Query: {
        async me(_, __, { dataSources: { taskAPI }, user, update }) {
            if (!user) update({ status: 403 });

            let tasks = (await taskAPI.list(user.tasks)).filter(task => task.solved);

            return { ...user, tasks };
        },
        tasks(_, __, { dataSources: { taskAPI }, user, update }) {
            if (!user) {
                update({ status: 403 });

                return null;
            }

            return taskAPI.list(user.tasks);
        },
        async scoreboard(_, __, { dataSources: { playerAPI, taskAPI }, user, update }) {
            if (!user) {
                update({ status: 403 });

                return null;
            }

            let [players, tasks] = await Promise.all([
                playerAPI.list(),
                taskAPI.list()
            ]);

            return players
                .map(player => ({
                    ...player,
                    tasks: player.tasks.map(id => tasks.find(task => task.id === id))
                }))
                .sort((a, b) => b.score - a.score || b.updatedAt - a.updatedAt);
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
