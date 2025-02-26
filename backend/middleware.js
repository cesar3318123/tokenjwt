const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.header("Authorization"); // Recibe el token del frontend

    if (!token) {
        return res.status(403).json({ message: "Acceso denegado" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Guarda el usuario en la petición
        next(); // Sigue con la siguiente función
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
    }
}

module.exports = { verifyToken };
