const express = require('express', '4.16.3');
const path = require('path');
const app = express();

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(3000, console.log('App Listening to port 3000'));

app.use(express.static(path.join(__dirname, '../www')));

app.listen(3000, function() {
  console.log('Web app listening on port 3000');
});
