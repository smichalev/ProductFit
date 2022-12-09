require('dotenv').config();

const cors = require('cors');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
	origin: [
		'http://localhost:8080',
		'https://localhost:8080'
	],
	credentials: true,
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: process.env.SESSION_KEY,
}))
require('./routes')(app);

require('./notify')();

app.listen(port, () => console.log('Server start at port', port));