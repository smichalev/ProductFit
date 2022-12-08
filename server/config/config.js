require('dotenv').config();

module.exports = {
	server: process.env.POSTGRES_SERVER,
	port: process.env.POSTGRES_PORT,
	database: process.env.POSTGRES_DATABASE_NAME,
	username: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	dialect: 'postgres',
}