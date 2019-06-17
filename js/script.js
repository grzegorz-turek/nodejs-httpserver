'use strict';
var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request', function (request, response) {
    if (request.method === 'GET' && request.url === '/') {
        fs.readFile('../index.html', 'utf-8', function(err, data){
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            if (err) {
                response.write('<h1>Can\'t read index.html</h1>');
                response.end();
            } else {
                response.write(data);
                response.end();
            }
        });

    } else {
        response.statusCode = 404;
        fs.readFile('../images/cat.jpg', function(err, data){
            if (err) {
                response.setHeader("Content-Type", "text/html; charset=utf-8");
                response.write('<h1>Error 404</h1>');
                response.end();
            } else {
                response.setHeader("Content-Type", "image/jpeg");
                //response.write('<img src="../images/cat.jpg" alt="cat">') czemu tak nie można???
                response.write(data);
                response.end();
            }
        });
    }
});

server.listen(8080);

/*
serverResponse('"image/jpeg"', data);
serverResponse('"text/html; charset=utf-8"', '<h1>Error 404</h1>');

function serverResponse(contentType, responseContent) {
    response.setHeader("Content-Type", contentType);
    response.write(responseContent);
    response.end();
}
*/
