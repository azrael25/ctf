import path from 'path';
import SQL from 'sequelize';
import { seeds } from './seeds';

const storage = process.env.NODE_ENV === 'development' ?
    path.resolve(__dirname, './store.sqlite') :
    ':memory:';

async function init() {
    const db = new SQL('database', 'dbadmin', 'dbpassword', {
        dialect: 'sqlite',
        storage,
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

    await db.sync();

    console.log('🗄  Database ready');

    return {
        db,
        models: {
            tasks,
            players
        }
    };
}

const ready = new Promise(resolve => init()
    .then(({ db, models }) => {
        seeds(db, models);
        resolve(models);
    }));

export function connect() {
    return ready;
}
