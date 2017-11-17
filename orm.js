const pg = require("pg");

const dbConfig = {
    user: "postgres",
    password: "p4r7n3r5",
    host: "localhost",
    port: 5432,
    database: "smoothie-shop",
    ssl: false
};

const pool = new pg.Pool(dbConfig);

const orm = {
	readAll: function(tableName) {
		const sql = `SELECT * FROM ${tableName};`;
		return pool.query(sql);
	}
};

module.exports = orm;
