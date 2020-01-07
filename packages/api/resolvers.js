function tasks() {
    return [];
}

function scoreboard() {
    const players = [],
        tasks = [];

    return players.map(player => ({
        ...player,
        tasks: JSON.parse(player.tasks).map(id => tasks.find(task => task.id === id))
    }));
}

export default {
    Query: {
        tasks,
        scoreboard
    }
};
