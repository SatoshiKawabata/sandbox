const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    switch (true) {
      case /^\/$/.test(req.url):
        fs.readFile("./dist/index.html", "utf-8", (err, data) => {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.write(data);
          res.end();
        });
        break;
      case /\.js$/.test(req.url):
        fs.readFile(`./dist${req.url}`, "utf-8", (err, data) => {
          setTimeout(() => {
            res.writeHead(200, { "Content-Type": "text/javascript" });
            res.write(data);
            res.end();
          }, 1000);
        });
        break;
      default:
        res.writeHead(404);
        res.end();
    }
  })
  .listen(8080);
