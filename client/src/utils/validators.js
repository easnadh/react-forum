export const isValidLogin = (value) => /^([a-z0-9]{6,20})$/.test(value);

export const isValidPassword = (value) => /^([a-z0-9]{6,20})$/.test(value);