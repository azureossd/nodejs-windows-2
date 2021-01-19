var jwt = require('jsonwebtoken');
var jwt_decode = require("jwt-decode");

module.exports.GenerateToken = (host, aud, sub, user, data, pass) => {
    var tokenJWT = jwt.sign({ 
        iss: host,
        aud: aud,
        sub: sub,
        name: user,
        role: "guest",
        data: data
      }, pass);
    return tokenJWT;
}

module.exports.DecodeToken = (token) => {
  var decoded = jwt_decode(token);
  return decoded.name;
}