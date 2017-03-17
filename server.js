var http = require('http')
var azure = require('azure-storage');
var blobService = azure.createBlobService();
blobService.createContainerIfNotExists('taskcontainer', {
  publicAccessLevel: 'blob'
}, function(error, result, response) {
  if (!error) {
        var port = process.env.PORT || 1337;
        http.createServer(function(req, res) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Resultado:" + result);
        }).listen(port);
    // if result = true, container was created.
    // if result = false, container already existed.
  }
});

// var multer  = require('multer');
// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage });
// var azureSorage = require('azure-storage');
// var blobSvc = azureSorage.createBlobService();
// var streamifier = require('streamifier');

// router.post('/imageupload', upload.single('file'),function(req, res, next){
//        console.log(req.file,'----files--',req.body);

//         var stream = streamifier.createReadStream(req.file.buffer);
//         console.log(stream)

//         blobSvc.createBlockBlobFromStream(
//             'images',
//             req.file.originalname,
//             stream,
//             req.file.size,
//             function(error, result, response){
//                 console.log(error,result,response);
//                 if(error){
//                     console.log("Couldn't upload stream");
//                     console.error(error);
//                 } else {
//                     console.log('Stream uploaded successfully');
//                     req.model.data = response;
//                     next();
//                 }
//             });

//     });