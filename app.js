const express = require('express', '4.16.3');
const path = require('path');
const app = express();

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.use(express.static(path.join(__dirname, '../www')));

app.listen(3000, function() {
  console.log('Web app listening on port 3000');
});
