const http = require("http")
const fs = require("fs/promises")
const NameplateGenerator = require("../NameplateGeneration/NameplateGenerator")
const port = 8080

const server = http.createServer(async (req, res) => {

    const route = req.url.replace(/^\/|\/$/g, '')

    switch (route) {

        case '':
            // try {
                console.log(__dirname)
                const index = await fs.readFile(__dirname + "/../../assets/index.html");
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(index);
                res.end();
            // } catch {
            //     res.statusCode = 500;
            //     res.setHeader('Content-Type', 'text/plain');
            //     res.end();
            // }

            break;

        case 'coffee':
            res.statusCode = 418;
            res.setHeader('Content-Type', 'text/plain');
            res.end();
            break;

        case 'test':
            let j;
            await fs.readFile(__dirname + "/test.json")
                .then((data) => {
                    j = JSON.parse(data);
                    console.log("PARSING")
                });
            // console.log(j);

            const nameplate = NameplateGenerator.nameplateBootstrap(j, "testNR1")

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(nameplate.outerHTML) // to string for transfer
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