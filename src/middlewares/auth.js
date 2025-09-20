const jwt = require('jsonwebtoken')

const userAuth = async(req,res,next)=>{
  try {
    const {auth_token} = req.cookies
    if(!auth_token){
      throw new Error("Unauthorized")
    }
    const { userID } = jwt.verify(auth_token,"Eradicator@123")
    req.userID = userID
    next()
  } catch (err) {
    res.status(403).send("ERROR:" + err.message)
  }
}

module.exports = {userAuth}