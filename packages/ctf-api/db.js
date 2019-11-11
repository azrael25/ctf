export const data = {
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

export const db = {
    tasks: id => id ? data.tasks.find(task => task.id === id) : data.tasks,
    players: id => id ? data.players.find(player => player.id === id) : data.players
};
