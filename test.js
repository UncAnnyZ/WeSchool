const fs = require('fs')
fs.readFile('./test.txt', (err, data) => {
    console.log(data.toString());
})