const User = require("../models/userModels.js")
const bcrypt = require("bcrypt")
const { v4: uuidv4 } = require("uuid")
const { setUser } = require("../service/auth")
const nodemailer=require("nodemailer")


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

        //email send
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
            port: 587, // Port for SMTP (usually 465)
            secure: false, // Usually true if connecting to port 465
            auth: {
                user: "ecohaul8@gmail.com", // Your email address
                pass: process.env.PASS, // Password (for gmail, your app password)
            },
        });
        const mailOptions = {
            from: {
                name: "ABC limited",
                address: "ecohaul8@gmail.com",
            },
            to: email,
            subject: "Welcome to our website",
            html: `
            <div class="container" style="width: 90vw; margin: auto; font-family: Arial, Helvetica, sans-serif;">
            <div class="from" >From : <span style="color: rgb(59, 148, 186); font-weight: 600;">Ecohaul</span></div>
            <div  class="content">
            <h1 style="text-align: center;">Thank You For your contribution</h1>
            <div class="overview">
                <div>Hey ${username}<span style="margin: 0px 2px;">
                <div>On behalf of the entire team at <span style="color: rgb(59, 148, 186); font-weight: 600;">ABC limited</span>, I want to extend a warm welcome to you! We're thrilled to have you as a new member of our community.</div>
                <div>Thank you for choosing <span style="color: rgb(59, 148, 186); font-weight: 600;">ABC limited</span> for contributing to the great cause. We're committed to providing you with an exceptional experience.</div>
                <div>As a member of ABC limited, you now contribute by giving variety of waste products.</div>
            </div>
            <div style="margin-top: 30px; margin-bottom: 3px;">Reach out to....</div>
            <div>For more info <a href="https://www.youtube.com/">Click Here</a></div>
            <div class="foot" style="margin: 30px 0px;">
                <div>Best Regards</div>
                <div style="font-weight: 600"><span style="color: rgb(59, 148, 186); font-weight: 600;">ABC Limited</span></div>
            </div>
        </div>
    </div>
            `
        }
        const sendMail = async (transporter, mailOptions) => {
            try {
                await transporter.sendMail(mailOptions);
                console.log("Email is sent")
            } catch (error) {
                console.log(error)
            }
        }
        await sendMail(transporter, mailOptions)

        delete user.password;
        return res.json({ status: true, user })
    } catch (error) {
        console.log(error)
    }
}

const loginRoute = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.json({ msg: "Incorrect username or password", status: false })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.json({ msg: "Incorrect username or password", status: false })
        }
        const token = setUser(user)
        res.cookie("uid", token)
        console.log(token)
        delete user.password;
        return res.json({ status: true, user })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { registerRoute, loginRoute }