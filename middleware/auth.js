import { getToken } from 'next-auth/jwt'

const authMiddleware = async (req, res, next) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === 'production'
  })
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
    req.user = token.sub
    next()
  } else {
    // Not Signed in
    res.status(401).json({ message: 'Not signed in' })
  }
  res.end()
}

export default authMiddleware