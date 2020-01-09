import { DataSource } from 'apollo-datasource';
import crypto from 'crypto';
import isEmail from 'isemail';
import { ok, err } from '../response';
import * as auth from '../auth';

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

    initialize(config) {
        this.context = config.context;
    }

    async signup(name, email, password) {
        if (!name) return err('name is required');
        if (!email) return err('email is required');
        if (!password) return err('password is required');
        if (!isEmail.validate(email)) return err('email is invalid');
        if (!checkPassword(password)) return err('password is too weak');

        let existing = await this.db.findOne({ where: { email } });

        if (existing) return err('user already exists');

        try {
            await this.db.create({
                name,
                email,
                validated: false,
                tasks: '[]',
                passwordHash: hash(password, this.secret),
                isAdmin: false
            });

            return ok('user is created');
        } catch (e) {
            return err('something went wrong');
        }
    }

    async login(email, password) {
        if (!email) return err('email is required');
        if (!password) return err('password is required');
        if (!isEmail.validate(email)) return err('email is invalid');

        let passwordHash = hash(password, this.secret),
            player = await this.db.findOne({ where: { email, passwordHash } });

        if (!player) return err('incorrect email or password');

        return ok('login success');
    }
}
