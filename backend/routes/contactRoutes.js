const express = require("express");

const router =
    express.Router();

const {
    enviarMensaje
} = require(
    "../controllers/contactController"
);

router.post(
    "/",
    enviarMensaje
);

module.exports = router;