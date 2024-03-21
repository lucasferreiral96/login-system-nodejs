const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: String,
    senha: String,
    token: String
},
{
    timestamps: true
})

const model = mongoose.model("testlogin", schema);

module.exports = model;