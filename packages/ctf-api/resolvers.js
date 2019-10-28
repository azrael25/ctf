const db = {
    tasks: [
        {
            id: 1,
            title: 'Crack Me',
            description: 'test',
            category: 'pwn'
        },
        {
            id: 2,
            title: 'Hack Me',
            description: 'test',
            category: 'web'
        }
    ],
    players: [
        {
            id: 1,
            name: 'Jon Snow',
            email: 'jon@winterfell.com',
            validated: true,
            tasks: [1]
        }
    ]
};

function tasks() {
    return db.tasks;
}

function scoreboard() {
    return db.players.map(player => ({
        ...player,
        tasks: player.tasks.map(id => db.tasks.find(task => task.id === id))
    }));
}

export default {
    Query: {
        tasks,
        scoreboard
    }
};
