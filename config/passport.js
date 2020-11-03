const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const db = require('../models')
const User = db.User

module.exports = passport => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ where: { email: email } })
            .then(async (user) => {
                if (!user) {
                    return done(null, false, { message: 'This Email is not Registered' })
                }
                const isMatched = await bcrypt.compare(password, user.password)
                if (!isMatched) {
                    console.log('user password not correct')
                    return done(null, false, { message: 'Email or Password incorrect' })
                }
                return done(null, user)
            })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findByPk(id)
            .then(user => done(null, user))
    })
}