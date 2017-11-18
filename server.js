const express = require('express');
const bodyParser = require('body-parser');
const internalTestDb = require('./inMemoryTestDb');
const orm = require('./orm');

const app = express();

// The line below is used once the client has been built for live use.
// app.use(express.static('client/build'));

/* Internal memory database test...

app.get('/api/menuitems', function(req, res) {
	// res.send("YO");
	res.send(internalTestDb.menuItems);
});

*/

app.use(bodyParser.json());

// The following is the table name we will be using for our app queries.
const tableName = "menu";

app.get('/api/menuitems', (req, res) => {
	let orderBy = "id"; // Future functionality will allow for sorting by code or other item properties; in this case orderBy would theoretically be passed in as a parameter.
	const dbResult = orm.readAll(orderBy, tableName);
	dbResult.then((result) => {
		res.send(result.rows);
	});
});

app.post('/api/menuitems', (req, res) => {
  const newItem = req.body;
  const dbResult = orm.addMenuItem(newItem, tableName);
  dbResult.then(result => {
    res.status(201);
    res.send('SUCCESS');
  });
});

app.put('/api/menuitems', function(req, res) {
	const itemToUpdate = req.body;
    const dbResult = orm.updateMenuItem(itemToUpdate, tableName);
  	dbResult.then(result => {
	    res.status(201);
	    res.send('SUCCESS');
    });
});

app.delete('/api/menuitems', function(req, res) {
	const itemToDelete = req.body;
    const dbResult = orm.deleteMenuItem(itemToDelete, tableName);
  	dbResult.then(result => {
	    res.status(201);
	    res.send('SUCCESS');
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('JSON Server is running on ' + port);
});
