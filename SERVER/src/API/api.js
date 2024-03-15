const http = require("http")
const fs = require("fs/promises")
const port = 8080

const server = http.createServer(async (req, res) => {

    const route = req.url.replace(/^\/|\/$/g, '')

    switch (route) {

        case '':
            try {
                const index = await fs.readFile("../../assets/index.html");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(index);
                res.end();
            } catch {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end();
            }
            
            break;

        case 'coffee':
            res.statusCode = 418;
            res.setHeader('Content-Type', 'text/plain');
            res.end();
            break;
    }
})

server.listen(port, function (error) {
    if (error) {
        console.log('Something went wrong: ', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
})