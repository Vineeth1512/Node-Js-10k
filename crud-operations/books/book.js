const fs = require("fs");
const path = require("path");
const pathName = path.join(__dirname, "data.json");

const readBookData = () => {
  const readData = fs.readFileSync(pathName, "utf-8");
  return JSON.parse(readData);
};

const addBookData = (data) => {
  const addBook = fs.writeFileSync(pathName, JSON.stringify(data));
  return addBook;
};

module.exports = { readBookData, addBookData };
