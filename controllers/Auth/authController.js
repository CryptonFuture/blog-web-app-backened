import User from '../../models/Auth/authModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { isValidEmail } from '../../utils/utils.js'
import validator from 'validator'
import { generateAccessToken, generateRefreshToken } from '../../utils/utils.js'

const register = async (req, res) => {
    const { firstname, lastname, email, password, confirmPass } = req.body

    if (!firstname || !lastname || !email || !password || !confirmPass) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid Email'
        })
    }

    const isExistUser = await User.findOne({ email })

    if (isExistUser) {
        return res.status(400).json({
            success: false,
            error: 'Email already exists has been taken'
        })
    } else if (password !== confirmPass) {
        return res.status(400).json({
            success: false,
            error: "Password does'nt match"
        })
    }

    if (password.length < 10 || confirmPass.length < 10) {
        return res.status(400).json({
            success: false,
            error: 'Password must be at least 10 characters long'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const hashConfirmPass = await bcrypt.hash(confirmPass, 10)

    const user = new User({
        firstname,
        lastname,
        email,
        password: hashPassword,
        confirmPass: hashConfirmPass
    })

    const userData = await user.save()

    if (userData) {
        return res.status(200).json({
            success: true,
            message: "user create successfully",
            data: userData
        })
    } else {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            error: 'Invalid Email'
        })
    }

    const userData = await User.findOne({ email })

    if (!userData) {
        return res.status(400).json({
            success: false,
            error: 'email & password is incorrect!'
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, userData.password)

    if (!isPasswordMatch) {
        return res.status(400).json({
            success: false,
            error: "email & password is incorrect!",
        })
    }

    const accessToken = await generateAccessToken({ user: userData })
    const refreshToken = await generateRefreshToken({ user: userData })

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    })

    const user = await User.findOne({ active: userData.active })

    if (!user.active) {
        return res.status(400).send({
            success: false,
            error: "This account is in-active, please contact your admin",
        });
    }

    const authUser = await user.save()

    if (authUser) {
        return res.status(200).json({
            success: true,
            message: 'login successfully',
            data: user,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } else {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }


}

export {
    register,
    login
}