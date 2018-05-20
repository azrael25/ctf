const messages = {
    required: 'Field must be filled',
    minLength: 'Minimum length of 8 character',
    maxLength: 'Maximum length of 255 characters',
    passwordSimple: 'Password too simple',
    passwordMatch: 'Passwords don\'t match',
    email: 'Invalid email'
};

export const required = () => ({
    rule: value => !!value,
    message: messages.required
});

export const minLength = length => ({
    rule: value => !value || value.length >= length,
    message: messages.minLength
});

export const maxLength = length => ({
    rule: value => !value || value.length <= length,
    message: messages.maxLength
});

const weights = {
        lower: 1,
        upper: 1,
        digit: 1,
        special: 2
    },
    minPasswordComplexity = 3;

export const passwordComplexity = () => ({
    rule: value => {
        let total = (/[A-Z]/.test(value) ? weights.upper : 0) +
            (/[a-z]/.test(value) ? weights.lower : 0) +
            (/\d/.test(value) ? weights.digit : 0) +
            (/[`~!@#$%^&*()_=+\\[\]{};:'",.<>/? -]/.test(value) ? weights.special : 0);

        return !value || total >= minPasswordComplexity;
    },
    message: messages.passwordSimple
});

export const passwordMatch = () => ({
    rule: (value, { password }) => !value || value === password,
    message: messages.passwordMatch
});

export const email = () => ({
    rule: value => !value || /^[a-z0-9_.+-]+@[a-z0-9_.-]+\.[a-z0-9_.-]+$/i.test(value),
    message: messages.email
});
