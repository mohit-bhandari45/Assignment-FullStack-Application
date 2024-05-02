const jwt=require("jsonwebtoken")
const secret="Mohit$123@$"

function setUser(user){
    return jwt.sign({
        _id:user._id,
        username:user.username,
    },secret)
}

function getUser(id){
    if(!token){
        return null;
    }
    return jwt.verify(token,secret)
}

module.exports={
    setUser,
    getUser
}