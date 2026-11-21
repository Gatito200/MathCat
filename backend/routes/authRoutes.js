const verificarToken =
    require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
    register,
    login
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
router.get(
    "/perfil",
    verificarToken,
    (req, res) => {
        res.json({
            mensaje: "Ruta protegida",
            usuario: req.usuario
        });
    }
);