import jwt from 'jsonwebtoken';
const { verify } = jwt; 

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null){
    return(res.sendStatus(401))
  } else {
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
       return(res.sendStatus(403))  
      } else {
        req.user = user
        return next()
      }
    })
  }
} 

export { verifyToken }