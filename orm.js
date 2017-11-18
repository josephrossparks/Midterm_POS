const pg = require("pg");

// In orm.js we are separating out all of our inreractivity with PostgreSQL.

const dbConfig = {
    user: "postgres",
    password: "p4r7n3r5",
    host: "localhost",
    port: 5432,
    database: "smoothie-shop",
    ssl: false
};

const pool = new pg.Pool(dbConfig);

// Here we are building an object that includes a series of functions which handle our database-related queries.
// We will then pass these functions out of the module and require them within server.js.

const orm = {
	readAll: function(orderBy, tableName) {
		const sql = `SELECT * FROM ${tableName} ORDER BY ${orderBy};`;
		return pool.query(sql);
	},

    addMenuItem: function(newItem, tableName) {
        const sql = `INSERT INTO ${tableName}(name, price, class, description, code) VALUES ($1,$2,$3,$4,$5);`;
        const values = [newItem.name, newItem.price, newItem.class, newItem.description, newItem.code];
        return pool.query(sql, values);
    },

    updateMenuItem: function(itemToUpdate, tableName) {
        const sql = `UPDATE ${tableName} SET name=$1, price=$2, class=$3, description=$4 WHERE code=$5;`;
        const values = [itemToUpdate.name, itemToUpdate.price, itemToUpdate.class, itemToUpdate.description, itemToUpdate.code];
        return pool.query(sql, values);
    },

        deleteMenuItem: function(itemToDelete, tableName) {
        const sql = `DELETE FROM ${tableName} WHERE code=$1;`;
        const values = [itemToDelete.code];
        return pool.query(sql, values);
    }

};

module.exports = orm;
