const http = require("http");
const url = require("url");
const { readBookData, addBookData } = require("./books/book.js");
const { v4 } = require("uuid");

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    const pathName = parsedUrl.pathname;
    const path = pathName.split("/");
    const id = path[2];
    const method = req.method;

    if (method === "GET" && pathName === "/products") {
      const bookData = readBookData();
      res.writeHead(200);
      return res.end(JSON.stringify(bookData));
    } else if (method === "POST" && pathName === `/addProduct`) {
      let body = "";
      req.on("data", (b) => {
        body += b;
      });
      req.on("end", () => {
        const data = readBookData();
        const inputData = JSON.parse(body);
        inputData.id = v4();
        data.push(inputData);
        addBookData(data);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Book Added Successfully",
            book: inputData,
          })
        );
      });
      return;
    } else if (method === "PUT" && pathName === `/updateBook/${id}`) {
      console.log("put method....");

      const bookData = readBookData();

      const updateBook = bookData.find((book) => book.id == id);
      if (updateBook) {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          const updateInfo = JSON.parse(body);
          updateBook.id = id;
          updateBook.name = updateInfo.name;
          updateBook.author = updateInfo.author;
          updateBook.publishedYear = updateInfo.publishedYear;
          addBookData(bookData);
          res.write("book updated successfully.");
          return res.end();
        });
      } else {
        res.writeHead(404);
        res.write("book not found");
        res.end();
      }
      return;
    } else if (method === "DELETE" && pathName === `/deleteBook/${id}`) {
      const bookData = readBookData();
      const checkId = bookData.find((book) => book.id == id);
      if (checkId) {
        const deleteBook = bookData.filter((book) => book.id != id);
        addBookData(deleteBook);
        res.writeHead(200);
        res.write("Book Deleted successfully..");
        return res.end();
      } else {
        res.writeHead(404);
        res.write("Book Id Not found");
        return res.end();
      }
    } else {
      res.write("Hey iam  http server");
      res.end();
    }
  })
  .listen(8080, () => {
    console.log("Server is running on port no 8080");
  });
