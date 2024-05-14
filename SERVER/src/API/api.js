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

        case 'test':
            if (req.method === "GET") {
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
                        const refinery = DataRefinery.DataRefinery(j)

                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html');
                        res.write(nameplate.outerHTML) // to string for transfer
                        res.end();

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
                console.log(split_route[1])
                console.log("1")

                console.log("3")
                const refinery = new DataRefinery(split_route[1]);
                console.log("4")
                console.log(split_route[2])
                data = await refinery.getData(split_route[2])
                console.log("HIER")
                console.log(data)
                console.log("finish")


                try {



                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');

                    res.end();
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


