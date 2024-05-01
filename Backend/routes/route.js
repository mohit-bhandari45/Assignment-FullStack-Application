const express=require("express")
const { registerRoute } = require("../controllers/userscontrollers")
const router=express.Router()

router.use(express.json())
router.post("/register",registerRoute)

module.exports=router