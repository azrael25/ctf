import jwt from 'jsonwebtoken';

let key;

export function init(secret) {
    key = secret;
}

export function decode(auth) {
    try {
        return jwt.verify(auth, key);
    } catch (err) {
        return { id: null };
    }
}

const options = {
    expiresIn: '7d'
};

export function encode(id) {
    return jwt.sign({ id }, key, options);
}
