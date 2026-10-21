const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");

module.exports.GenerateToken = (host, aud, sub, user, data, pass) => {
    const tokenJWT = jwt.sign({ 
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
  const decoded = jwt_decode.jwtDecode(token);
  return decoded.name;
}