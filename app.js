const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.set('views', __dirname + '/src');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render('index.html');
});

app.use(express.static(path.join(__dirname, 'src')));

app.listen(PORT, () => {
  console.log(`Check out the app at http://localhost:${PORT}`);
});
