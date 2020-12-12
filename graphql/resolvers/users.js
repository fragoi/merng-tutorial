const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
const { validateRegisterInput, validateLoginInput } = require('../../validators');

module.exports = {
    Mutation: {
        register: register,
        login: login
    }
}

function asUserWithToken(user) {
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' });
    return {
        id: user._id,
        token,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt.toISOString()
    };
}

async function register(_, { registerInput: { username, email, password, confirmPassword } }) {
    const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
    if (!valid) {
        throw new UserInputError('validateRegisterInput', { errors });
    }
    const user = await User.findOne({ username });
    if (user) {
        throw new UserInputError('Username is taken', {
            errors: {
                username: 'Username is taken'
            }
        });
    }
    password = bcrypt.hashSync(password);
    const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date()
    });
    const savedUser = await newUser.save();
    return asUserWithToken(savedUser);
}

async function login(_, { username, password }) {
    const { valid, errors } = validateLoginInput(username, password);
    if (!valid) {
        throw new UserInputError('validateLoginInput', { errors });
    }
    const user = await User.findOne({ username });
    if (!user) {
        throw new UserInputError('User not found');
    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
        throw new UserInputError('Wrong credentials');
    }
    return asUserWithToken(user);
}
