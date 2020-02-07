const authMiddleware = require("../middlewares/auth")
const express = require("express");

const router = express.Router();

router.use(authMiddleware);

router.get("/projects", (request, response) => {
    response.send({ ok: true, user: request.userId });
})

module.exports = app => app.use("/devorion", router);

