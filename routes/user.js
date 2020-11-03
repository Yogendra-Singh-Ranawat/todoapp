const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

router.get('/login', (req, res) => {
    res.render('login', { userCSS: true })
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
    res.render('register', { userCSS: true })
})

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    User.findOne({ where: { email: email } })
        .then(async (user) => {
            if (user) {
                console.log('User already exists')
                res.render('register', { name, email, password, password2 })
            }
            else {
                try {
                    const salt = await bcrypt.genSalt(10)
                    const hash = await bcrypt.hash(password, salt)

                    const newUser = new User({
                        name,
                        email,
                        password: hash
                    })
                    newUser
                        .save()
                        .then(user => {
                            res.redirect('/')
                        })
                        .catch(err => console.log(err))
                }
                catch (error) {
                    console.log(error)
                }
            }
        })

})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
})

module.exports = router