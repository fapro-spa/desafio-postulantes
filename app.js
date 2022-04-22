const express = require('express')
const router = require("./routes/router");
const morgan = require("morgan");

require("dotenv").config()
const app = express()
app.use(express.json());
app.use(morgan("tiny"));
app.use(router);



app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en el puerto: "+process.env.PORT);
})

