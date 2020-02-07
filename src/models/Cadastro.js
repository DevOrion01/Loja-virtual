const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TELEFONE_VALIDATOR_PATTERN = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/;

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    telefone: {
        type: String,
        validate: {
            validator: function(valor) {
                return TELEFONE_VALIDATOR_PATTERN.test(valor);
            },
            message: '{VALUE} não é um telefone válido'
        }
    },
    nome_usuario: {
        type: String,
        index: {
            unique: true
        },
        required: [true, 'O nome de usuário é obrigatório']
    },
    senha: {
        type: String,
        required: true,
        select: false
    },
    createAd: {
        type: Date,
        default: Date.now,
    }
});

Usuario.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;
    next();
})

module.exports = mongoose.model('Usuario', Usuario);