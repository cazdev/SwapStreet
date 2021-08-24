const jwt = require('jsonwebtoken')

const retrieveToken = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const createToken = user => jwt.sign({ email: user.email, name: user.name}, process.env.SECRET)

const decodeToken = token => jwt.verify(token, process.env.SECRET)

const authorize = request => {
  try {
    const token = retrieveToken(request)
    if (!token) return false
    const decodedToken = decodeToken(token)
    return decodedToken.username && decodedToken
  } catch (err) {
    console.error(err)
    return false
  }
}



module.exports = {
  retrieveToken,
  createToken,
  decodeToken,
  authorize
}