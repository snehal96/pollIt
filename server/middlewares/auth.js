require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.headers['authorization']){
        const token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, decode)=> {
            if(err){
                next(Error("Authentication Failed\n"+decode))
            }else{
                req.decode = decode;
                next();
            }
        })
    }else{
        next(Error("Please Login/Register to vote"));
    }
}