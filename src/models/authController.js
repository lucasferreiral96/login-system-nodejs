const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const schema = require("./userSchema");

const dotenv = require("dotenv");
dotenv.config();


const SECRET = process.env.SECRET;

const login = async (req, res) => {

    try {
       
    } catch (error) {

    }

}

const signup = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);

        if(body.nome == "" || body.email == "" || body.senha == ""){
            return res.status(401).send("<span class=\"emptyfields\" style=\"color: red; font-family: sans-serif\">Não foi possível proseguir, todos os campos devem estar preenchidos</span>"+"<br>"+"<a href=\"/signup\">Voltar</a>");
        }

            const check = await schema.findOne({email: req.body.email});

            if(check){
                res.status(401).json("E-mail ja existe");
        
               }else{
                   const token = jwt.sign({email: req.body.email}, process.env.SECRET)
                   const data = {
                       email: req.body.email,
                       senha: req.body.senha,
                       token
                    }
        
                    if(await schema.insertMany([data])){
                        
                        console.log("Cadastrado com sucesso");
                        res.status(200).render("success");
                    }
                }


    } catch (error) {
        console.log("Algo deu errado: "+error.message);
    }

}
    

    

const savedata = (req, res) => {
    const body = req.body;
    const newschema = new schema(body)

    newschema.save({}).then((sucesso) => {
        if(sucesso){
            res.status(200).json("Cadastrado com sucesso")
        }
    }).catch((erro) => {
        if(erro){
            res.status(500).json("Erro ao cadastrar: "+erro.message);
        }
    })

}

module.exports = {
    login,
    savedata,
    signup
}