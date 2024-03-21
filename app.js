const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const authController = require("./src/models/authController");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const RouterController = require("./src/models/RouteController");
const connflash = require("connect-flash");
const express_session = require("express-session");
const jwt = require("jsonwebtoken");
const schema = require("./src/models/userSchema");

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended: true}));

app.use(express_session({
secret: "loginsecret",
cookie: {maxAge: 60000},
resave: false,
saveUninitialized: false,
}))


app.use('/css', express.static(__dirname+'/src/public/css'));
app.use('/images', express.static(__dirname+'/src/public/images'));
app.use('/js', express.static(__dirname+'/src/public/js/'))
app.set('views', __dirname+'/src/views');


app.use("/primeiro", RouterController);

//Template Engine
app.set('view engine', 'ejs');


app.post("/login", authController.login);
app.post("/salvar", authController.savedata);
app.post("/signup", authController.signup);

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/signup", (req, res) => {
    res.render("signup");
})

app.get("/menu", (req, res) => {
    res.render('menu')
})

app.get("/logado", (req, res) => {
    res.render("logged");
})

app.post("/success", (req, res) => {
    res.render("success");
})


mongoose.connect("mongodb://localhost:27017/JwtExercise").then((sucesso) => {
    if(sucesso){
        console.log("Conectado ao MongoDB");
    }

    app.listen(8080, () => {
        console.log("Servidor Online");
    })
}).catch((erro) => {
    console.log("Erro conexao MongoDB: "+erro.message);
})