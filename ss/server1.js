var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),

    mimeTypes = {
        "html": "text/html",
        "js": "text/javascript",
        "css": "text/css",
        "json": "application/json"
    },

    list = [
        {name: "Artem", lastName: "Yekzarkho", gender: "m"},
        {name: "Yevheniia", lastName: "Kryschyk", gender: "f"},
        {name: "Yulyia", lastName: "Lur\'eva", gender: "f", age: "27"},
        {name: "Dmytro", lastName: "Shashkov", gender: "m"},
        {name: "Marian", lastName: "Kotsylovs\'kyi", gender: "m"},
        {name: "Oleksandr", lastName: "Poltorak", gender: "m"},
        {name: "Dmytryi", lastName: "Hun\'ko", gender: "m"},
        {name: "Oleksandr", lastName: "Den\'ha", gender: "m"}
    ];

function onRequest (request, response) {
    var mimeType,
        uri = url.parse(request.url).pathname, 
        filename = path.join(process.cwd(), uri);

    if (!request.url) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello World');
    } else if (request.url === '/students') {
        if (request.method === 'GET') {
            response.writeHead(200, {"Content-Type": 'application-json'});
            response.write(JSON.stringify(list));
            response.end();
            return;
        }
    }

    fs.exists(filename, function(error) {
        if (!error) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found");
            response.end();
            return;
        }
        fs.readFile(filename, function(err, file) {
            if (err) {        
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err);
                response.end();
                return;
            }

            mimeType = mimeTypes[filename.split('.').pop()];
            if (!mimeType) {
                mimeType = 'text/plain';
            }
            response.writeHead(200, {"Content-Type": mimeType});
            response.write(file);
            response.end();
        });
    });
}
http.createServer(onRequest).listen(3000);

