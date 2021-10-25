require('dotenv').config(); // this is important!
module.exports = {
	"development": {
		"username": process.env.DB_USER,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_NAME,
		"host": process.env.DB_HOST,
		"dialect": "postgres",
		"logging": false,
		dialectOptions: {
				useUTC: false
		},
		define: {
				schema: "public"
		}
	},
	"test": {
		"username": process.env.DB_USER,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_NAME,
		"host": process.env.DB_HOST,
		"dialect": "postgres",
		dialectOptions: {
				useUTC: false
		},
	},
	"production": {
		"username": process.env.DB_USER,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_NAME,
		"host": process.env.DB_HOST,
		"dialect": "postgres",
		dialectOptions: {
				useUTC: false
		},
		define: {
				schema: "public"
		}
	}
}