const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const filepath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  console.log("requesting file", path.basename(filepath), "....");
  const ext = path.extname(filepath);
  let contType = "text/html";
  switch (ext) {
    case ".css":
      contType = "text/css";
      break;
    case ".js":
      contType = "text/javascript";
      break;
    case ".jpg":
      contType = "image/jpg";
      break;
    case ".json":
      contType = "application/json";
      break;
  }

  fs.readFile(filepath, (err, data) => {
    if (err) {
      if (err.code == "ENOENT") {
        console.log("The requested file is not found!");
        fs.readFile(path.join(__dirname, "404.html"), "utf-8", (err, data) => {
          res.writeHead(200, { "content-type": contType });
          res.end(data);
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error ${err.code}`);
      }
    } else {
      res.writeHead(200, { "content-type": contType });
      res.end(data);
      console.log("SERVED");
    }
  });
});

server.listen(8080, () => console.log("Server is running and listening on port 8080"));
