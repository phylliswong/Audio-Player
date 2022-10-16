const express = require('express', '4.16.3');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './www/index.html'));
});

app.use(express.static(path.join(__dirname, '../www')));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
