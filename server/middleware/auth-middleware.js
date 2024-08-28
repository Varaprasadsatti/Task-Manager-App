const jwt = require("jsonwebtoken")
const user = require("../models/user")
require('dotenv').config()

const userAuthVerification = async (req, res) => {
    // console.log("iam in verification");

    const token = req.cookies.token;
    
    if (!token) {
        return res.json({
            success: false,
            message: "Token not available or invalid token"
        })
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            // console.log(decoded)

            const userInfo = await user.findById(decoded.getId);

            if (userInfo) {
                res.status(200).json({
                    success: true,
                    userInfo
                })
            }

        }
        catch (e) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            })
        }
    }

}


module.exports = { userAuthVerification }