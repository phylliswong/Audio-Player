const express = require('express', '4.16.3');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
