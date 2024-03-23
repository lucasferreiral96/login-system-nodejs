const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const schema = require("./userSchema");
const SECRET = process.env.SECRET;

// Criptografar senha
async function hashPass(password){
    const res = await bcrypt.hash(password, 10);
    return res;
}

// Comparar senha do formulario com a dados do banco de dados caso exista.
async function compare(userPass, hashPass){
    const res = await bcrypt.compare(userPass, hashPass);
    return res;
}

// Função para criar contas
const signup = async (req, res) => {
    try {
        const body = req.body;

        if(body.nome == "" || body.email == "" || body.senha == ""){
            return res.status(401).send("<span class=\"emptyfields\" style=\"color: red; font-family: sans-serif\">Não foi possível proseguir, todos os campos devem estar preenchidos</span>"+"<br>"+"<a href=\"/signup\">Voltar</a>");
        }

            const check = await schema.findOne({email: req.body.email});

            if(check){
                res.status(401).json("E-mail ja existe");
        
               }else{
                   const token = jwt.sign({email: req.body.email}, SECRET)

                res.cookie("jwt", token, {
                    maxAge: 600000,
                    httpOnly: true,
                    
                })

                   const data = {
                       email: req.body.email,
                       senha: await hashPass(req.body.senha),
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

// Função para fazer login
const login = async function(req, res){
    try {
          const verify = await schema.findOne({email: req.body.email}); 
          if(!verify){
            res.send("Usuário não encontrado");
          }         
          const pwdcheck = await compare(req.body.senha, verify.senha);

            if(verify && pwdcheck){
            res.cookie("jwt", verify.token, {
                maxAge: 600000,
                httpOnly: true,

            })

                res.render("dashboard", {email: req.body.email});
            }else{
                res.send("Dados Inválidos, tente novamente.");
            }

    } catch (error) {
        console.log("Algo deu errado, método login(): "+error.message);
    }

}

module.exports = {
    login,
    signup,
    hashPass,
    compare
}