const {
    Router
} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    check,
    validationResult
} = require('express-validator')
const config = require('../config/default.json')
const User = require('../models/User')
const router = Router()









// /api/auth/register
router.post('/register',
    // Check data on server side
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Min symbols = 6')
        .isLength({
            min: 6
        })
    ],
    async (req, res) => {
        try {
        // if check() return smth with request in validationResult() - return error
            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'requisits is invalid'
                })
            }


            // Take pass and mail from incoming request
            const {
                email,
                password
            } = req.body


            // Check whether candidate is in a base
            const candidate = await User.findOne({
                email
            })
            if (candidate) {
                return res.status(400).json({
                    message: 'That user already exists'
                })
            }


            // Crypting and update a model pass
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                password: hashedPassword
            })


            // Waite when user press save
            await user.save()
            res.status(201).json({
                message: 'User is created'
            })

        } catch (error) {
            res.status(500).json({
                message: 'Smth went wrong try again'
            })
        }
    })








// /api/auth/login
router.post('/login',
    [check('email', 'enter email').normalizeEmail().isEmail(),
     check('password', 'enter password').exists()
    ],
    async (req, res) => {

    try {
        // if check() return smth with request in validationResult() - return error
            const errors = validationResult(req)
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'requisits is invalid'
                })
            }

            // Take pass and mail from incoming request
            const {
                email,
                password
        } = req.body
        
          
         // Check whether candidate is in a base
         const user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(400).json({
                message: 'That user doesn\'t exist'
            })
        }

        // Compare entered password with shashed in the base
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'the password is invalid'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )
        
        res.json({token, userId: user.id})


        } catch (error) {
            res.status(500).json({
                message: 'Smth went wrong try again'
            })
        }

})


module.exports = router