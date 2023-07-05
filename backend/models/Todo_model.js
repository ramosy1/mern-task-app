const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const TodoModel= mongoose.model('ToDo', todoSchema);
module.exports = TodoModel;