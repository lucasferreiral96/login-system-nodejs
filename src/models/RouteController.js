const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Terça Rota...");
})

router.get("/", (req, res) => {
    res.send("Primeira Rota...");
})

router.get("/", (req, res) => {
    res.send("Segunda Rota...");
})

module.exports = router