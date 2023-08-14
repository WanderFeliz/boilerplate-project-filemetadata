var express = require('express');
const multer = require('multer');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const uploadDest = multer({ dest: 'public/data/uploads/' });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', uploadDest.single('upfile'), function (req, res) {

  const { file } = req;

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });

});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
