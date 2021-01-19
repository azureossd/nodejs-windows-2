'use strict';

const fs = require('fs');

module.exports.GetData = () => {
    let rawdata = fs.readFileSync('seed.json');
    let projects = JSON.parse(rawdata);
    return projects;
}
