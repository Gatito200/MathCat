const Contact = require("../models/Contact");

const enviarMensaje = async (req, res) => {

    try {

        console.log("Mensaje recibido:", req.body);

        const { mensaje } = req.body;

        if (!mensaje) {

            return res.status(400).json({
                mensaje: "Debes escribir un mensaje"
            });

        }

        const nuevoMensaje = new Contact({
            mensaje
        });

        await nuevoMensaje.save();

        return res.status(201).json({
            mensaje: "Mensaje enviado correctamente"
        });

    } catch (error) {

        console.error("ERROR CONTACT:", error);

        return res.status(500).json({
            mensaje: "Error del servidor"
        });

    }

};

module.exports = {
    enviarMensaje
};
