const http = require("http");
const { readProductData } = require("./products/product.js");

const url = require("url");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data.json");

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const pathName = parsedUrl.pathname;
    const method = req.method;
    const path = pathName.split("/");
    const id = path[2];

    console.log(id);

    if (method === "GET" && pathName === "/allProducts") {
      const pdata = readProductData();
      console.log("pdata........", pdata);

      res.writeHead(200);
      res.write(JSON.stringify(pdata));
      return res.end();
    } else if (method === "GET" && pathName === `/product/${id}`) {
      const pdata = readProductData();
      console.log(pdata);

      const product = pdata.find((p) => p.id == id);
      console.log(product);

      if (product) {
        res.writeHead(200);
        res.write(JSON.stringify(product));
        return res.end();
      } else {
        res.writeHead(404);
        res.write("Product not found");
        return res.end();
      }
    } else if (method === "POST" && pathName === `/addProduct`) {
      const productsData = readProductData();
      let data = "";
      console.log("pre data", data);
      res.writeHead(200);

      req.on("data", (chunk) => (data += chunk.toString()));
      req.on("end", () => {
        console.log("inside ", data);
        const newProduct = JSON.parse(data);
        productsData.push(newProduct);
        fs.writeFileSync(filePath, JSON.stringify(productsData, null, 2));

        // res.write(JSON.stringify(data));
        return res.end(JSON.stringify(newProduct));
      });
    }
  })
  .listen(3000, () => {
    console.log("server is running on port nno 3000");
  });
