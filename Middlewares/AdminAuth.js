const jwt=require("jsonwebtoken")


module.exports = function verifyingToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({
            error: "invalid token format"
        });
    }

    jwt.verify(token, process.env.ADMIN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.email = decoded.email;

        next(); 
    });
};
