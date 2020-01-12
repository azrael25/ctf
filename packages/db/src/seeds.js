export async function seeds(db, models) {
    await db.drop();
    await db.sync();
    models.tasks.create({ title: 'Crack Me', description: 'test', category: 'pwn', flag: '111' });
    models.tasks.create({ title: 'Hack Me', description: 'test', category: 'web', flag: '222' });
    models.players.create({ name: 'Jon Snow', email: 'jon@winterfell.com', validated: false, tasks: '[1]', score: 1000 });
}
