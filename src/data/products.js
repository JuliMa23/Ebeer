const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, './products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

module.exports = products;
