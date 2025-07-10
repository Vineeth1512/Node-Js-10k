// creating http server

// const http = require("http");
// const file = require("fs");
// const { log } = require("console");
// http
//   .createServer((request, response) => {
//     response.writeHead(201, {
//       "content-type": "application/json",
//     });
//     response.write("hi this is fro node js");
//     response.end();
//   })
//   .listen(3210, () => {
//     console.log("Server is running");
//   });

//Read and write file in nodejs

// const readFile = file.readFileSync("sample.txt", "utf8");
// console.log(readFile);

// const writeFile = file.appendFile(
//   "sample.txt",
//   "this is vineeth kumar\n",
//   (err) => {
//     if (err) {
//       console.log("Error appending to file:", err);
//     } else {
//       console.log("New content added to the file!");
//     }
//   }
// );

import { add, sub, multiply, div } from "./math.js";

console.log(add(22, 4));
console.log(sub(115, 32));
console.log(div(15, 32));
console.log(multiply(1, 32));
