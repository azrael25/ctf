import path from 'path';
import SQL from 'sequelize';

export function initDB(username, password) {
    const db = new SQL('database', username, password, {
        dialect: 'sqlite',
        storage: path.resolve(__dirname, './store.sqlite'),
        // storage: ':memory:',
        logging: false
    });

    const tasks = db.define('task', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
        title: SQL.STRING,
        description: SQL.STRING,
        category: SQL.STRING,
        flag: SQL.STRING
    });

    const players = db.define('player', {
        id: {
            type: SQL.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        createdAt: SQL.DATE,
        updatedAt: SQL.DATE,
        name: SQL.STRING,
        email: SQL.STRING,
        validated: SQL.BOOLEAN,
        tasks: SQL.JSON,
        passwordHash: SQL.STRING,
        isAdmin: SQL.BOOLEAN,
        score: SQL.INTEGER
    });

    db.sync();

    return {
        instance: db,
        tasks,
        players
    };
}
