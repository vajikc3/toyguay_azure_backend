var express = require('express');
var nconf = require('nconf');
nconf.env();
 var accountName = nconf.get("STORAGE_NAME");
 var accountKey = nconf.get("STORAGE_KEY");


/* -- MULTER -- */
var multer  = require('multer');
var memStorage = multer.memoryStorage();
var multerUpload = multer({ storage: memStorage });

/* -- AZURE -- */
var azureSorage = require('azure-storage');
var blobService = azureSorage.createBlobService(accountName, accountKey);

var app = express();

app.post('/', multerUpload.single('file'), function (req, res){
    var respuesta = {
        file : file.originalname,
        body : req.body
    }
    res.json(respuesta);
});

/* -- INIT SERVER -- */
var port = process.env.PORT || 1337;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
