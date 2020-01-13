import SQL from 'sequelize';
import { seeds } from './seeds';

const isDev = process.env.NODE_ENV === 'development';

export async function connect() {
    const db = new SQL('ctf', 'dbadmin', 'dbpassword', {
        host: isDev ? 'localhost' : 'db',
        dialect: 'postgres',
        logging: false,
        retry: {
            max: 5,
            backoffBase: 1000,
            match: [
                SQL.ConnectionError
            ],
            report: (msg, { $current, max }) => {
                if (/ECONNREFUSED/.test(msg)) {
                    $current === max ?
                        console.error(`Cannot connect to the database (${max} attempts were used)`) :
                        console.warn(`Trying to connect to the database... ${max - $current} attempt(s) are remained`);
                }
            }
        }
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

    await seeds(db, { players, tasks });

    console.log('🗄  Database ready');

    return {
        db,
        models: {
            tasks,
            players
        }
    };
}
