const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema({
	name: {
		type: String, 
		required: true, 
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		required: [true, 'Email address is required'],
		validate: [validateEmail, 'Please fill a valid email address'],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	password: {
		type: String, 
		required: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date, 
		default: Date.now,
	},
	company: [
		{ 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Startup' 
		}
	]
});

const User = mongoose.model('User', UserSchema);

module.exports = User