const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./userModel");
const { verifyToken} = require("./middleware");

const router = express.Router();


router.post("/login", async (req, res) => {
    try {
        // Extrae el usuario y la contraseña del cuerpo de la solicitud
        const { username, password } = req.body;

        // Busca el usuario en la base de datos
        const user = await User.findOne({ where: { username } });

        // Si el usuario no existe, devuelve un error
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Verifica si la contraseña es correcta comparándola con la almacenada (hash)
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Si las credenciales son correctas, genera un token JWT
        const token = jwt.sign({ id: user.id }, "secreto", { expiresIn: "1h" });

        // Envía el token al cliente
        res.json({ token });

    } catch (error) {
        console.error("Error en el servidor:", error);
        // Si ocurre un error en el servidor, responde con un mensaje de error
        res.status(500).json({ message: "Error en el servidor" });
    }
});

//Registrar usuario
router.post("/register", async (req, res) => {

    const { username, password } = req.body; 

    try {

        const hashedPassword = await bcrypt.hash(password, 10); 


        const newUser = new User(username, hashedPassword); 
        

        User.save(newUser); 


        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {

        res.status(500).json({ message: "Error al registrar usuario" });
    }
});

router.post("/login", async (req, res) => {

})

module.exports = router;