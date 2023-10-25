const http = require('http')
const fs = require('fs')
const path = require('path')
const PORT = 3000

const server = http.createServer((req, res) => {
	res.setHeader('Content-type', 'text/html')
	console.log('server request')
	console.log('just for test')

	const createPath = page => {
		return path.resolve(__dirname, 'views', `${page}.html`)
	}

	let basePath = ''

	switch (req.url) {
		case '/home':
		case '/index.html':
		case '/': {
			basePath = createPath('index')
			res.statusCode = 200
			break
		}
		case '/cont': {
			res.statusCode = 301
			res.setHeader('Location', '/contacts')
			res.end()
			break
		}
		case '/contacts': {
			basePath = createPath('contacts')
			res.statusCode = 200
			break
		}
		default: {
			basePath = createPath('error')
			res.statusCode = 404
			break
		}
	}

	fs.readFile(basePath, (error, data) => {
		if (error) {
			res.statusCode = 500
			res.end()
		} else {
			res.write(data)
			res.end()
		}
	})
})
server.listen(PORT, 'localhost', error => {
	error ? console.log(error) : console.log(`listening port ${PORT}`)
})
