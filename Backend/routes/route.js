const express=require("express")
const cors=require("cors")
const { registerRoute, loginRoute } = require("../controllers/userscontrollers")
const router=express.Router()
const cookieParser=require("cookie-parser")
require("dotenv").config()

router.use(express.json())
router.use(cors())
router.use(cookieParser())
router.post("/register",registerRoute)
router.post("/login",loginRoute)

module.exports=router