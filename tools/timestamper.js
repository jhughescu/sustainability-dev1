const fs = require('fs');
const axios = require('./axios');

const writer = function () {
    const currentDate = new Date().toLocaleString();
    const data = {
        datetime: currentDate
    };
    const jsonData = JSON.stringify(data);
    fs.writeFile('timestamp.js', 'let timestamp = ' + jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
        } else {
            console.log('JSON file has been written successfully!');
        }
    });
}

writer();
let i = setInterval(writer, 60000);
