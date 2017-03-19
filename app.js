var express = require('express');
var uuid = require('node-uuid');

var nconf = require('nconf');
nconf.env();
 var accountName = nconf.get("STORAGE_NAME");
 var accountKey = nconf.get("STORAGE_KEY");


/* -- MULTER -- */
var multer  = require('multer');
var memStorage = multer.memoryStorage();
var multerUpload = multer({ storage: memStorage });

/* -- STREAMIFIER -- */
var streamifier = require('streamifier');

/* -- AZURE -- */
var azureSorage = require('azure-storage');
console.log("prueba 1");
var blobService = azureSorage.createBlobService(accountName, accountKey);
console.log("prueba 2");
var app = express();

app.post('/', multerUpload.single('file'), function (req, res){
    var fileName = req.file.originalname;
    var fileNameComponents = fileName.split('.');
    var fileExtension = fileNameComponents[fileNameComponents.length-1];

    var stream = streamifier.createReadStream(req.file.buffer);
    blobService.createBlockBlobFromStream(
        'toyguay-image-container',
        uuid.v4() + "." + fileExtension,
        stream,
        req.file.size,
        function(error, result, response){
            console.log(error,result,response);
            if(error){
                console.log("Couldn't upload stream");
                console.error(error);
            } else {
                console.log('Stream uploaded successfully');
            }
            var respuesta = {
                error:error,
                result:result,
                response:response
            }
            res.json(respuesta);
        });
});

/* -- INIT SERVER -- */
var port = process.env.PORT || 1337;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
