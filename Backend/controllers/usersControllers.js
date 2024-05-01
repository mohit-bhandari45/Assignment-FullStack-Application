const User = require("../models/userModels.js")
const bcrypt = require("bcrypt")

const registerRoute = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const usernameCheck = await User.findOne({ username }) 
        if (usernameCheck) {
            return res.json({ msg: "Username already exist", status: false })
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({ msg: "Email already exist", status: false })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        })
        delete user.password;
        return res.json({ status: true, user })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { registerRoute }