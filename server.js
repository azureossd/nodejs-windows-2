const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const uuid = require('uuid');

const port = process.env.PORT || 3000;
const os = require("os");
const dbService = require('./database');
const tokenService = require('./oauth');

app.use(bodyParser.json())

app.use(express.static('public'))

app.post('/api/oauth2', (req, res) => {
    const host = os.hostname();
    const aud = req.body.client_id;
    const sub = uuid.v4();
    const user = "User-"+ uuid.v4(); 
    const data = dbService.GetData();
    const secret = req.body.client_secret;
    const token = tokenService.GenerateToken(host, aud, sub, user, data, secret);
    res.header("CustomAuth", token);
    res.send(token);
})

app.get('/user', (req, res) => {
    const token = req.header('authorization').replace(/^Bearer\s+/, "");
    const user = tokenService.DecodeToken(token);
    res.send(user);
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

