const express = require('express')
require("dotenv").config()
require("./controllers/conn.js").connectDB()
const router=require("./routes/route.js")
const app = express()

app.use("/",router)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})