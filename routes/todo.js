const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User
const Todo = db.Todo

const { isAuthenticated } = require('../config/auth')

router.get('/', isAuthenticated, (req, res) => {
    res.send('list all todos')
})

router.get('/:id', isAuthenticated, (req, res) => {
    res.send('list one todo')
})

router.get('/new', isAuthenticated, (req, res) => {
    res.send('new todo page')
})

router.post('/', isAuthenticated, (req, res) => {
    res.send('new todo submit')
})

router.get('/:id/edit', isAuthenticated, (req, res) => {
    res.send('edit page')
})

router.put('/:id', isAuthenticated, (req, res) => {
    res.send('edit submit')
})

router.delete('/:id/delete', isAuthenticated, (req, res) => {
    res.send('delete page')
})

module.exports = router