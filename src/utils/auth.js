import config from "../config";
import { User } from "../resources/user/user.model";
import jwt from "jsonwebtoken";

export const newToken = user => {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    })
}

export const verifyToken = token => {
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) {
                return reject(err)
            }
            resolve(payload)
        })
    })
}

export const signup = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' })
    }

    try {
        const user = await User.create(req.body)
        const token = newToken(user)
        return res.status(201).send({ token })
    } catch (err) {
        return res.status(500).end()
    }
}

export const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' })
    }

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(401).send({message: 'not auth'})
    }

    try {
        const match = await user.checkPassword(req.body.password)

        if (!match) {
            return res.status(401).send({message: 'not auth'})
        }

        const token = newToken(user)
        return res.status(201).send({token})
    } catch (err) {
        return res.status(401).send({message: 'not auth'})

    }
}

export const protect = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).end()
    }

    let token = req.haders.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).end()
    }

    try {
        const payload = await verifyToken(token)

        const user = await User.findById(payload.id)
            .select('-password')
            .lean()
            .exec()
        
            req.user = user
            next()
    } catch (err) {
        return res.status(401).end()
    }

    next()
}