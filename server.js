const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postRouter = require('./routes/post-routes')
require('dotenv').config()
const contactRouter = require('./routes/contact-routes')
const postApiRoutes = require('./routes/api-post-routes')
const createPath = require('./helpers/create-path')
const chalk = require('chalk')
const errorMsg = chalk.bgKeyword('white').redBright
const successMsg = chalk.bgKeyword('green').white

mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(res => console.log(successMsg('Connected db')))
	.catch(error => console.log(errorMsg(error)))

const app = express()
app.set('view-engine', 'ejs')

app.listen(process.env.PORT, error => {
	error
		? console.log(error)
		: console.log(successMsg(`listening port ${process.env.PORT}`))
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.static('styles'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
	const title = 'Home'
	res.render(createPath('index'), { title })
})
app.use(postRouter)
app.use(contactRouter)
app.use(postApiRoutes)
app.use((req, res) => {
	const title = '404'

	res.status(404).render(createPath('error'), { title })
})
