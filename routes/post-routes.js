const express = require('express')
const {
	getPost,
	deletePost,
	editPost,
	updatePost,
	getPosts,
	addPost,
	addGetPost,
} = require('../controllers/post-controller')

const router = express.Router()
router.get('/add-post', addGetPost)
router.post('/add-post', addPost)
router.get('/posts', getPosts)
router.get('/posts/:id', getPost)
router.delete('/posts/:id', deletePost)

router.get('/edit/:id', editPost)
router.put('/edit/:id', updatePost)

module.exports = router
