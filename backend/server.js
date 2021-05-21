// const https = require('https')

// const server = https.createServer((req, res) => {
//     res.end('Le serveur est connecté');
// });

// server.listen(process.env.PORT || 3000);

const http = require('http');
const app = require("./app");


app.set("port", process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);