const fs = require('fs');

module.exports.GetData = () => {
    const rawdata = fs.readFileSync('seed.json');
    const projects = JSON.parse(rawdata);
    return projects;
}
