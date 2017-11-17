const express = require('express');
const bodyParser = require('body-parser');
const internalTestDb = require('./inMemoryTestDb');
const orm = require('./orm');

const app = express();

// The line below is used once the client has been built for live use.
// app.use(express.static('client/build'));

app.use(bodyParser.json());

app.get('/api/menuitems', (req, res) => {
	// res.send("stuff");
	const tableName = "menu";
	const dbResult = orm.readAll(tableName);
	dbResult.then((result) => {
		res.send(result.rows);
	});
});

/* Internal memory database test...

app.get('/api/menuitems', function(req, res) {
	// res.send("YO");
	res.send(internalTestDb.menuItems);
});

*/

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('JSON Server is running on ' + port);
});
