var express = require('express');

/* -- MULTER -- */
var multer  = require('multer');
var memStorage = multer.memoryStorage();
var multerUpload = multer({ storage: memStorage });

/* -- AZURE -- */
var azureSorage = require('azure-storage');
var blobService = azureSorage.createBlobService();

var app = express();

app.get('/',  getImage);

/* -- INIT SERVER -- */
var port = process.env.PORT || 1337;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});


/* ===== IMPL ===== */
function getImage(req, res){
    res.send('Hello World!');
}