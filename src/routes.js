const express = require("express")
const UserController = require("./Controllers/DevController")
const authMiddleware = require("./middlewares/auth")

const router = express.Router();

let User = new UserController();

router.get("/devorion", User.listerAllUsers);
router.post("/devorion/cadastro", User.registerUser);
router.post("/devorion/autenticacao", User.authenticate);


module.exports = router;

