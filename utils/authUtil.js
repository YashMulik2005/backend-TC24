const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config()
const verifyToken = (req, res, next) => {
    let token = req.headers['authentication']
    console.log(token);
    if (!token) {
        return res.status(401).json({
            data: {
                status: false,
                msg: "Unauthorized - No token"
            }
        })
    }
    //console.log(token);
    token = token.split(' ')[1];
    jwt.verify(token, process.env.jwt_key, (err, valid) => {
        if (err) {
            return res.status(401).json({
                data: {
                    status: false,
                    msg: "Unauthorized - Invalid token"
                }
            })
        }
        else {
            req.user = valid;
            next()
        }
    });
}


module.exports = verifyToken;