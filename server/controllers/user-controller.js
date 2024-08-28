const Joi = require("joi")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()

//to register an user
//to login an user
//to logout an user


const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const generateToken = (getId) => {
    return jwt.sign({ getId }, process.env.SECRET_KEY , {
        expiresIn: 3 * 24 * 60 * 60
    })
}

const registerUser = async (req, res, next) => {
    const { name, email, password } = await req.body

    const { error } = registerSchema.validate({ name, email, password })

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        })
    }

    try {
        const isUserEmailAlreadyExists = await User.findOne({ email })
        if (isUserEmailAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "user email already exists"
            })
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 12);

            const newlyCreatedUser = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            if (newlyCreatedUser) {
                const token = generateToken(newlyCreatedUser?._id);

                res.cookie("token", token, {
                    withCredentials: true,
                    httpOnly: false,
                })

                res.status(201).json({
                    success: true,
                    message: "User Registration Successful",
                    userData: {
                        name: newlyCreatedUser.name,
                        email: newlyCreatedUser.email,
                        _id: newlyCreatedUser._id
                    }
                })
                next()
            }
        }
    }
    catch (e) {
        console.log(e)

        return res.status(500).json({
            success: false,
            message: "something went wrong...please try again later"
        })
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = await req.body

    const { error } = loginSchema.validate({ email, password })

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        })
    }

    try {
        const getUser = await User.findOne({ email })

        if (!getUser) {
            return res.json({
                success: false,
                message: "Incorrect Email"
            })
        }

        const checkAuth = await bcrypt.compare(password, getUser.password)

        if (!checkAuth) {
            return res.json({
                success: false,
                message: "Incorrect Password"
            })
        }

        const token = generateToken(getUser?._id)

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        })

        res.status(201).json({
            success: true,
            message: "User Logged In"
        })
    }
    catch (e) {
        console.log(e)

        return res.status(500).json({
            success: false,
            message: "something went wrong...please try again later"
        })
    }

}

const logout = async (req,res)=>{
    res.cookie("token","",{
        withCredentials : true,
        httpOnly : false
    });

    return res.status(200).json({
        success : true,
        message : "Logout Successful"
    })
}






module.exports = { registerUser, loginUser , logout}