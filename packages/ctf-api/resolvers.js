import { db } from './db';

function tasks() {
    return db.tasks();
}

function scoreboard() {
    return db.players().map(player => ({
        ...player,
        tasks: player.tasks.map(id => db.tasks(id))
    }));
}

export default {
    Query: {
        tasks,
        scoreboard
    }
};
