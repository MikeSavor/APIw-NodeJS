const http = require("http");

const PORT = 5000;

const server = http.createServer(async (req, res) => {});

server.listen(PORT, () => {
    console.log(`HELLO WORLD`);
});