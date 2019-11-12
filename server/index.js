const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const auth = require('./middleware/auth');
const CORS = require('cors');
const bodyParser = require('body-parser');

// ENV
const serverPort = parseInt(process.env.PORT) || 3001;
const dbHost = process.env.DB_HOST || 'localhost:27017';
const dbUrl = `mongodb://${dbHost}/test`;

const app = express();

app.use(express.json());
app.use(CORS());
app.use(bodyParser.json());

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

db.on('error', () => console.error('Error when connecting to database at url: ' + dbUrl));
db.once('open', () => console.log("Connected to database"));

app.post('/login', async (req, res) => {

	try {
		const { username, password } = req.body;
		const user = await User.findByCredentials(username, password);
		if (!user) {
			return res.status(401).send({error: 'Login failed! Check authentication credentials'})
		}
		const token = await user.generateAuthToken();
		delete user.tokens;
		res.send({ token });
	} catch (error) {
		res.status(400).send({error: error.toString()});
	}
});

app.post('/register', async (req, res) => {
	try {
		console.log(req.body);
		const user = new User(req.body);
		await user.save();
		const token = await user.generateAuthToken();
		delete user.tokens;
		res.status(200).send({ user, token });
	} catch (error) {
		console.log(error);
		res.status(400).send({error: error.toString()});
	}
});

app.post('/logout', auth, async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.send();
	} catch(error) {
		res.status(400).send({error: error.toString()});
	}
});

app.post('/logoutall', auth, async (req, res) => {
	try {
		req.user.tokens.splice(0, req.user.tokens.length);
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(400).send({error: error.toString()});
	}
});

app.post('/widgets', auth, async (req, res) => {
	try {
		req.user.widgets = req.body;
		req.user.markModified('widgets');
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(400).send({error: error.toString()});
	}
});

app.get('/widgets', auth, async (req, res) => {
	try {
		res.json(req.user.widgets);
	} catch (error) {
		res.status(400).send({error: error.toString()});
	}
});

app.get("/services", auth, async (req, res) => {
	try {
		res.json(req.user.services);
	} catch (error) {
		res.status(400).send({error: error.toString()});
	}
});

app.post("/services", auth, async (req, res) => {
	try {
		req.user.services = req.body;
		await req.user.save();
		res.send();
	} catch (error) {
		res.status(400).send({error: error.toString()});
	}
});

app.listen(serverPort, () => {
	console.log("Server starting on port: " + serverPort);
});
