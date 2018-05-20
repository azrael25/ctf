export default {
    state: {
        id: null,
        name: null
    },
    reducers: {
        update: (state, payload) => ({ ...state, ...payload })
    },
    effects: {
        async login(username, password) {
            let user = await Promise.resolve({ id: 1, name: 'azrael' });

            this.update(user);
        }
    }
};
