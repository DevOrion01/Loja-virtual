const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Cadastro");
const authConfig = require("../config/auth")

function gerarToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

class User {
    constructor() {}
 
    async listerAllUsers(request, response) {
        const users = await Usuario.find();
        try {
            return response.json(users);
        }
        catch {
            return response.send( { error: "Lista de usuários não encontrado!" })
        }
        
    }

    async registerUser(request, response) {

        const {  email } = request.body;
        
        await Usuario.findOne({ email }, (err, data) => {
            if(err) return response.send({ error: "Erro ao buscar usuário!"});
            if(data) return response.send({ error: "Usuário já registrado"});
            
            Usuario.create(request.body, (err, data) => {
                if(err) return response.send({ error: "Erro ao criar usuário" });
                data.senha = undefined;
                return response.json({
                    data,
                    token: gerarToken({ id: data.id}),
                });
            })
        });
    }

    async authenticate(request, response) {

        const { nome_usuario, senha} = request.body;
        const user = await Usuario.findOne({ nome_usuario }).select("+senha");
        if(!user) {
            return response.status(400).send({ error: "Usuário não encontrado!" });
        }
        if(!bcrypt.compare(senha, user.senha)) {
            return response.status(400).send({ error: "Senha inválida!" });
        }

        user.senha = undefined;

        response.json({
            user,
            token: gerarToken({ id: user.id }),
        });
        
    }
}   
module.exports = User;
