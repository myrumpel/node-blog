const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactsSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
})

const Contact = mongoose.model('Contact', contactsSchema)

module.exports = Contact
