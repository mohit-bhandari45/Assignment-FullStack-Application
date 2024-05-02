const jwt=require("jsonwebtoken")
const secret="Mohit$123@$"

function setUser(user){
    return jwt.sign({
        _id:user._id,
        username:user.username,
    },secret)
}

function getUser(token){
    if(!token){
        return null;
    }
    try {
        return jwt.verify(token,secret)
    } catch (error) {
        return null;
    }
}

module.exports={
    setUser,
    getUser
}