const express = require('express');
const app = express();

// ROUTES
app.use('/institutions', require('./src/routes/institutions'));

const main = async () => {
    try {
        await app.listen(3000, () => {
            console.log("Servidor OK, puerto 3000")
        })
    } catch {
        console.log("Error de Servidor")
    }
}

main();
