import { DataSource } from 'apollo-datasource';
import crypto from 'crypto';
import isEmail from 'isemail';

const sha1 = crypto.createHash('sha1');

function hash(...args) {
    return sha1.update(args.join('|')).digest('hex');
}

const minPasswordLength = 8;

function checkPassword(value = '') {
    return value.length >= minPasswordLength &&
        /\d/.test(value) &&
        /[a-z]/.test(value) &&
        /[A-Z]/.test(value) &&
        /[!@#$%^&*()_+=,./?\\|'";:-]/.test(value);
}

export class PlayerAPI extends DataSource {
    constructor({ db, secret }) {
        super();
        this.db = db;
        this.secret = secret;
    }

    async signup({ name, email, password }) {
        if (!name) return { err: 'name is required' };
        if (!email) return { err: 'email is required' };
        if (!password) return { err: 'password is required' };
        if (!isEmail.validate(email)) return { err: 'email is invalid' };
        if (!checkPassword(password)) return { err: 'password is too weak' };

        try {
            let existing = await this.db.findOne({ where: { email } });

            if (existing) return { err: 'user already exists' };

            let player = await this.db.create({
                name,
                email,
                validated: false,
                tasks: '[]',
                passwordHash: hash(password, this.secret),
                isAdmin: false
            });

            return {
                id: player.id,
                err: null
            };
        } catch (e) {
            return { err: 'something went wrong' };
        }
    }

    async login({ email, password }) {
        if (!email) return { err: 'email is required' };
        if (!password) return { err: 'password is required' };
        if (!isEmail.validate(email)) return { err: 'email is invalid' };

        let passwordHash = hash(password, this.secret);

        try {
            let player = await this.db.findOne({ where: { email, passwordHash } });

            if (!player) return { err: 'incorrect email or password' };

            return {
                id: player.id,
                err: null
            };
        } catch (e) {
            return { err: 'something went wrong' };
        }
    }

    async list() {
        try {
            let players = await this.db.findAll();

            return players.map(player => ({
                id: player.id,
                name: player.name,
                score: player.score
            }));
        } catch (e) {
            return [];
        }
    }
}
