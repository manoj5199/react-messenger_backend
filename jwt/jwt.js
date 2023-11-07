import jwt from "jsonwebtoken";
import moment from 'moment-timezone'

const verify = (req,res,next) => {
    let token
    // let token = req.headers['authorization']
    const { authorization } = req.headers
    if(authorization && authorization.split(' ')[0] == "Token"){
        token = authorization.split(' ')[1]
    } else {
        token = null
    }

    if(token) {
        const secret = 'testing'
        jwt.verify(token,secret,(err,tokenData) => {
            if(err){
                console.log(err)
                res.json({code :400, error: true, message: "Invalid Token"})
            } else {
                var tokenExpTime = moment(new Date()).format("X");
                console.log(tokenData.exp)
                if (tokenExpTime > tokenData.exp) {
                    res.json({ code: 300, message: "Token Expired", data: null });
                } else {
                    req.payload = tokenData
                    console.log(tokenData,"tokenData")
                    next();
                  }
            }
        })
    }
}

export default verify;