import { DataSource } from 'apollo-datasource';

export class TaskAPI extends DataSource {
    constructor({ db }) {
        super();
        this.db = db;
    }

    async list(solved) {
        try {
            let tasks = await this.db.findAll();

            return tasks.map(task => ({
                id: task.id,
                title: task.title,
                description: task.description,
                category: task.category,
                solved: solved.indexOf(task.id) > -1,
                value: 100 //task.value
            }));
        } catch (e) {
            return [];
        }
    }
}
