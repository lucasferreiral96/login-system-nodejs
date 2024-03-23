const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const authController = require("./src/models/authController");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
// const RouterController = require("./src/models/RouteController");
const express_session = require("express-session");
const jwt = require("jsonwebtoken");



app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


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



//Template Engine
app.set('view engine', 'ejs');

app.post("/login", authController.login);
app.post("/signup", authController.signup);

app.get("/", (req, res) => {
    if(req.cookies.jwt){
        const verify = jwt.verify(req.cookies.jwt, "3556013235560132355601323556013235560132355601323556013235560132");
        res.render("dashboard", {email: verify.email});
    }else{
        res.render("index");
    }
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

app.get("/dashboard", (req, res) => {
    res.render("dashboard");
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