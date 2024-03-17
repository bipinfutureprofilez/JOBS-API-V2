const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')
const { BadRequest, NotFound } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    const user = await User.create({ ...req.body })
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            throw new NotFound('User does not exist!'); 
        }

        const isPassword = await user.comparePassword(password);
        if (!isPassword) {
            throw new BadRequest('Credential invalid!');
        }

        const token = user.createJWT();
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { userId, userName } = payload;
        res.status(StatusCodes.OK).json({ user: { name: userName }, token});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}