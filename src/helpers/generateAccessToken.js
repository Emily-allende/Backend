import jwt from 'jsonwebtoken';
const { sign } = jwt; 

function generateAccessToken(user) {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m'})
} 

export { generateAccessToken }