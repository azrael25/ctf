export async function seeds(instance, db) {
    await instance.sync();
    db.tasks.create({ title: 'Crack Me', description: 'test', category: 'pwn', flag: '111' });
    db.tasks.create({ title: 'Hack Me', description: 'test', category: 'web', flag: '222' });
    db.players.create({ name: 'Jon Snow', email: 'jon@winterfell.com', validated: false, tasks: '[1]' });
}
