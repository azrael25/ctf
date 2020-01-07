import path from 'path';
import crypto from 'crypto';
import SQL from 'sequelize';

// const sha1 = crypto.createHash('sha1');

export function init() {
    const db = new SQL('database', 'dbadmin', '111', {
        dialect: 'sqlite',
        storage: path.resolve(__dirname, './store.sqlite'),
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
        tasks: SQL.JSON
    });

    db.sync();

    return {
        instance: db,
        tasks,
        players
    };
}
