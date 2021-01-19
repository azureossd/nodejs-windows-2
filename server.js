const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const Str = require('@supercharge/strings');

const port = process.env.PORT || 3000;
var os = require("os");
var dbService = require('./database');
var tokenService = require('./oauth');

app.use(bodyParser.json())

app.use(express.static('public'))

app.post('/api/oauth2', (req, res) => {
    host = os.hostname();
    aud = req.body.client_id;
    sub = Str.random();
    user = "User-"+ Str.random(); 
    data = dbService.GetData();
    secret = req.body.client_secret;
    let token = tokenService.GenerateToken(host,aud,sub,user,data,secret);
    res.header("CustomAuth",token);
    res.send(token);
})

app.get('/user', (req, res) => {
    token = req.header('authorization').replace(/^Bearer\s+/, "");
    var user = tokenService.DecodeToken(token);
    res.send(user);
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
});

