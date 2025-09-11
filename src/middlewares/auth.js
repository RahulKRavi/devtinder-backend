const adminAuth = (req,res,next)=>{
  const token = '1212';
  if(token === '1212'){
    next()
  } else {
    res.status(401).send("Unauthorized acces")
  }
}

module.exports = {adminAuth}