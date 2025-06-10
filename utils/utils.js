import jwt from 'jsonwebtoken'
import { access_token, refresh_token } from '../config.js'

function isValidEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

const generateAccessToken = async (user) => {
    const accessToken = jwt.sign(user, access_token, { expiresIn: '1h' })
    return accessToken
}

const generateRefreshToken = async (user) => {
    const refreshToken = jwt.sign(user, refresh_token)
    return refreshToken
}

export {
    isValidEmail,
    generateAccessToken,
    generateRefreshToken
} 