const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
const crypto = require('crypto');

const encodePassword = (password) => {
    return cryptr.encrypt(password);
}

const decodePassword = (encode_password) => {
    return cryptr.decrypt(encode_password);
}

// const tokens = new Map();// stateless
// const { v1 } = require('uuid')//stateless
const jwt = require("jsonwebtoken");
const secretKey = "ankit";




// Generate HMAC SHA256 signature
function generatedSignature(orderId, paymentId, secret = process.env.RAZORPAY_KEY_SECRET) {
    const hmac = crypto.createHmac('sha256', secret);
    const data = `${orderId}|${paymentId}`;
    return hmac.update(data).digest('hex')
}




const createToken = (data) => {

    // stateLess---> token
    // const token = v1();
    // if (tokens.get(token) == undefined) {
    //     tokens.set(token, data);
    //     return token;
    // } else {
    //     return createToken(data)
    // }


    // statefull-----> token 
    const token = jwt.sign(data.toJSON(), secretKey, {
        expiresIn: "100000000"
    });

    // expireIn --> kitnaa time mae out honaa hai  1000000milisecond  24h in hours 
    // expiredAt--> kitna beja yani ki kis time pr 
    return token;
}

const verifyToken = (token) => {

    // return tokens.get(token)//stateless

    try {
        const admin = jwt.verify(token, secretKey);
        return admin
    } catch (err) {
        return undefined
    }
}



const genertateFileName = (file_name) => {
    return Math.floor(Math.random() * 1000000) + new Date().getTime() + file_name;
}

module.exports = { genertateFileName, createToken, verifyToken, encodePassword, decodePassword, generatedSignature }