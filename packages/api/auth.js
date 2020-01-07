import jwt from 'jsonwebtoken';

const secret = 'secret';

export function decode(auth) {
    return { id: '1' };

    try {
        return jwt.verify(auth, secret);
    } catch (err) {
        return { id: null };
    }
}

const options = {
    expiresIn: '7d'
};

export function encode(id) {
    return jwt.sign({ id }, secret, options);
}
