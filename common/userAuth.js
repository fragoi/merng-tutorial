const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../config');

function authenticate(context) {
    const authorization = context.req.headers.authorization;
    if (!authorization) {
        throw new AuthenticationError('Missing authorization header');
    }
    const token = authorization.substring('Bearer '.length);
    if (!token) {
        throw new AuthenticationError('Missing authentication token');
    }
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (e) {
        throw new AuthenticationError('Invalid token', e);
    }
}

module.exports = authenticate;
