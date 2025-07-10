const fs = require("fs");
const path = require("path");

const pathName = path.join(__dirname, "data.json");

const readFile = () => {
  const data = fs.readFileSync(pathName, "utf-8");

  return JSON.parse(data);
};

const writeFile = (data) => {
  const addData = fs.writeFileSync(pathName, JSON.stringify(data));
  return addData;
};

module.exports = { readFile, writeFile };
