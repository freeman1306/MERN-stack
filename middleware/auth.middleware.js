const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next()
    }

    try {

        // Grabe token string from headers
        const token = req.headers.authorization.split(' ')[1]  // "Bearer TOKEN"

        if (!token) {
            return res.status(401).json({message: 'No auth'})
        }
        
        // Decoding token with jwt
        const decoded = jwt.verify(token, config.get('jwtSecret'))

        // Add decoded token to request
        req.user = decoded

        // Continue processing of request
        next()

    } catch (error) {
        
    }
}