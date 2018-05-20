import { init } from '@rematch/core';
import user from './user';

const store = init({
    models: {
        user
    }
});

export default store;
