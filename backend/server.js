const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const conectarDB = require("./config/db");

const app = express();

conectarDB();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, "..")));

// Ruta principal
app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "..", "index.html")
    );

});

// Ruta de prueba
app.get("/api/test", (req, res) => {

    res.json({
        mensaje: "Backend de MathCat funcionando correctamente"
    });

});

// Iniciar servidor
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {

    console.log(
        `Servidor iniciado en http://localhost:${PORT}`
    );

});