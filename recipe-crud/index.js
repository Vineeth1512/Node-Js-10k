const http = require("http");
const url = require("url");
const { readFile, writeFile } = require("./raceipes/raceipes.js");

const path = require("path");

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url);

    const pathName = parsedUrl.pathname;
    const path = pathName.split("/");
    const id = path[2];
    const method = req.method;

    if (method === "GET" && pathName === "/receipes") {
      const receipesData = readFile();
      res.writeHead(200);
      res.write(" we can see all receipes data");
      return res.end(JSON.stringify(receipesData));
    }
    console.log("........", pathName);
    console.log(id);

    res.write("Iam http server");
    res.end();
  })
  .listen(3000, () => {
    console.log("server is running on port no 3000");
  });
