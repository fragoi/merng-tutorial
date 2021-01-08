const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const { validateRegisterInput, validateLoginInput } = require('../../common/validators');
const User = require('../../models/User');

async function getUsers() {
    return await User.find().sort({ createdAt: -1 });
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
    return _asUserWithToken(savedUser);
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
    return _asUserWithToken(user);
}

function _asUserWithToken(user) {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h' });
    return {
        id: user.id,
        token,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
    };
}

module.exports = {
    Query: {
        getUsers
    },
    Mutation: {
        register,
        login
    }
}
