const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User
const Todo = db.Todo

const { isAuthenticated } = require('../config/auth')

router.get('/', isAuthenticated, (req, res) => {
    res.send('list all todos')
})

module.exports = router