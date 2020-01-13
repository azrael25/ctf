import { DataSource } from 'apollo-datasource';

function getTask(task) {
    if (!task) return null;

    return {
        id: task.id,
        title: task.title,
        description: task.description,
        category: task.category,
        value: 100 //task.value
    };
}

export class TaskAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
    }

    async list(solved = []) {
        try {
            let tasks = await this.db.findAll();

            return tasks.map(task => ({
                ...getTask(task),
                solved: solved.indexOf(task.id) > -1
            }));
        } catch (e) {
            return [];
        }
    }

    async find(flag) {
        try {
            return getTask(await this.db.findOne({ where: { flag } }));
        } catch (e) {
            return null;
        }
    }
}
