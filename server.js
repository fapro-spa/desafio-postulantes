const express = require("express");
const routes = require("./routes/url");

const app = express();

app.use(express.json());

app.use("/", routes);

app.listen(3000, ()=>{
    console.log('Escuchando en el puerto 3000')
})

