import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.PRIVATE_KEY);
        req.body.user = decoded.user;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

export default verifyToken;