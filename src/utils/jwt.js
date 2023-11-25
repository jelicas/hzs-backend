import jwt from "jsonwebtoken";


export function createAccessToken(data) {
    const jwtSecret = process.env.SECRET;
    return jwt.sign(data, jwtSecret);
}

export function authorizeUser(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid token" });

    try {
        const jwtSecret = process.env.SECRET;
        const decoded = jwt.verify(token, jwtSecret);
        res.locals.user = decoded;
        next();
    } catch (error) {
        console.log("Invalid JWT");
        return res.status(401).json({ message: "Invalid token" });
    }
}