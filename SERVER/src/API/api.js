const http = require("http")
const fs = require("fs/promises")
const NameplateGenerator = require("../NameplateGeneration/NameplateGenerator")
const DataRefinery = require("../DataRetrival/DataRefinery")
const port = 8080
const querystring = require('querystring')
var url = require('url')

const server = http.createServer(async (req, res) => {

    const route = req.url.replace(/^\/|\/$/g, '')
    console.log(route)
    const split_route = route.split("?")

    switch (split_route[0]) {

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

        case 'testNameplate':
            if (req.method === "GET") {
                let j;
                await fs.readFile(__dirname + "/test.json")
                    .then((data) => {
                        j = JSON.parse(data);
                        console.log("PARSING")
                    });
                // console.log(j);

                const nameplate = NameplateGenerator.nameplateBootstrap(j, "testNR1")
                console.log(nameplate)

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(nameplate.outerHTML) // to string for transfer
                res.end();
            }
            break;

        case 'testQrCode':
            if (req.method === "GET") {                
                let qrCode = NameplateGenerator.returnQrCodeOnly('Test QR Code!')
                console.log(qrCode)

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.write(qrCode) // to string for transfer
                res.end();
            }
            break;
        case 'test2':
            if (req.method === "GET") {
                let j;
                await fs.readFile(__dirname + "/test3.json")
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

            break;

        case "NameplateGenerateByData":
            if (req.method === "POST") {
                console.log("POST")
                try {
                    let body = "";
                    req.on("data", chunk => {
                        console.log(chunk.toString())
                        body = chunk.toString();
                    });
                    req.on("end", async () => {
                        let j;
                        try {
                            j = JSON.parse(body);
                        }
                        catch (error) {
                            res.statusCode = 400;
                            res.setHeader('Content-Type', 'text/plain');
                            res.end();
                            return;
                        }
                        try{
                        const nameplate = NameplateGenerator.nameplateBootstrap(j, "testNR1")

                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        res.write(nameplate.outerHTML) // to string for transfer
                        res.end();
                        }
                        catch (error){
                            res.statusCode = 500;
                            res.setHeader('Content-Type', 'text/plain');
                            res.end();
                        }

                    });
                }
                catch (error) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end();
                }
            }
            else {
                console.log("405")
                res.statusCode = 405;
                res.setHeader('Content-Type', 'text/plain');
                res.end();
            }
            break;
        case "NameplateGenerateByReference":
            if (req.method === "GET") {



                try {
                    // new Class with base route in constructor
                    const refinery = new DataRefinery(split_route[1]);

                    // get Data for asset id
                    data = await refinery.getData(split_route[2])

                    // create nameplate for json data from asset id
                    const nameplate = NameplateGenerator.nameplateBootstrap(data, "testNR1")

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    res.write(nameplate.outerHTML) // to string for transfer
                    res.end();
                    break;

                }

                catch (error) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end();
                }



            }
            else {
                console.log("405")
                res.statusCode = 405;
                res.setHeader('Content-Type', 'text/plain');
                res.end();
            }
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


