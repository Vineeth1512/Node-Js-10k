const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.json");
console.log(filePath);

const readProductData = () => {
  const pdata = fs.readFileSync(filePath, "utf-8");

  return JSON.parse(pdata);
};

module.exports = { readProductData };
