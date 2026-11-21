const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        const usuarioExistente = await User.findOne({ email });

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: "El correo ya está registrado"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const nuevoUsuario = new User({
            nombre,
            email,
            password: passwordHash
        });

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Email y contraseña son obligatorios"
            });
        }

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(401).json({
                mensaje: "Credenciales inválidas"
            });
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje: "Credenciales inválidas"
            });
        }

        const token = jwt.sign(
            {
                id: usuario._id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            mensaje: "Login exitoso",
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
};
module.exports = {
    register,
    login
};