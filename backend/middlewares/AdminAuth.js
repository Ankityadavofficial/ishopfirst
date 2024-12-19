const { verifyToken } = require("../helper");

function adminAuth(req, res, next) {
    const authToken = req.headers?.authorization;

    if (authToken) {
        const admin = verifyToken(authToken)        
        if (admin == undefined || admin['admin_type'] == undefined) {
            res.send({
                msg: 'Invailed / Expired token',
                status: 0
            })
        } else {
            next()
        }
    } else {
        res.send({
            msg: "Missing token",
            status: 0
        })
    }
}

module.exports = adminAuth;