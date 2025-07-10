const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const pathName = path.join(__dirname, "data.json");

const readFile = () => {
  const data = fs.readFileSync(pathName, "utf-8");
  return JSON.parse(data);
};
const writeFile = (data) => {
  const addReceipe = fs.writeFileSync(pathName, JSON.stringify(data));
  return addReceipe;
};

module.exports = { readFile, writeFile };
