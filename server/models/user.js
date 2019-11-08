let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	tokens: [{
		token: {
			type: String,
			required: true,
		}
	}],
	widgets: [{
		_id: false,
		type: {
			type: String,
			required: true,
		},
		config: { type: Object },
	}]
});

userSchema.pre('save', async function (next) {
	// Hash the password before saving the user model
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}
	next()
});

userSchema.methods.generateAuthToken = async function() {
	// Generate an auth token for the user
	const user = this;
	const token = jwt.sign({_id: user._id}, (process.env.JWT_KEY || 'dashboard'));
	user.tokens = user.tokens.concat({token});
	await user.save();
	return token
};

userSchema.statics.findByCredentials = async (username, password) => {
	// Search for a user by username and password.
	const user = await User.findOne({ username: username});
	if (!user) {
		throw new Error({ error: 'Invalid login credentials' })
	}
	const isPasswordMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordMatch) {
		throw new Error({ error: 'Invalid login credentials' })
	}
	return user
};

const User = mongoose.model('User', userSchema);

module.exports = User;
