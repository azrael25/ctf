function res(success, message, payload) {
    return {
        success,
        message,
        ...payload ? { payload } : {}
    };
}

export function ok(message, payload) {
    return res(true, message, payload);
}

export function err(message, payload) {
    return res(false, message, payload);
}
