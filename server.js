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

 