const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const routes = require("./routes");

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/lojavirtual", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(routes);

app.use(bodyParser.urlencoded({ extended: false }));
app.set(bodyParser.json());

require("./Controllers/projectController")(app);

const PORT = 8081;
app.listen(PORT, () => {
    console.log("API inicializada!")
})