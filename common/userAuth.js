const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

module.exports = authenticate;

function authenticate(context) {
    const authorization = context.headers.authorization;
    if (!authorization) {
        throw new AuthenticationError('Missing authorization header');
    }
    const token = authorization.substring('Bearer '.length);
    if (!token) {
        throw new AuthenticationError('Missing authorization token');
    }
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (e) {
        throw new AuthenticationError('Invalid token', e);
    }
}
