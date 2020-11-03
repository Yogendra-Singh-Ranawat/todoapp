const express = require('express')
const app = express()

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const userRoutes = require('./routes/user')
const todoRoutes = require('./routes/todo')
const homeRoutes = require('./routes/home')
const passport = require('passport')
const session = require('express-session')

const db = require('./models')
const Todo = db.Todo
const User = db.User

const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
    secret: 'skvnlsvnlsvllmvm',
    resave: 'false',
    saveUninitialized: 'false'
}))

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
    res.locals.user = req.user
    next()
})

app.use(express.static('public'))

app.use('/todos', todoRoutes)
app.use('/users', userRoutes)
app.use('/', homeRoutes)

app.listen(port, () => {
    console.log(`App is running on port ${port}!`)
})