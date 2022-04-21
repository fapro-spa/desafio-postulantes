const axios = require('axios');
const express = require('express')
const app = express()
const { csvtojson } = require('./helpers');

const PATH = 'https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.csv?_=1650572925167';

async function getData() {
    const response = await axios.get(PATH);
    return csvtojson(response.data);
}

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

app.get('/api/v1/payroll', function (req, res) {
    getData()
        .then(data => res.json(data));
})

app.listen(3000, function () {
    console.log('Servidor corriendo en puerto : ' + 3000);
})
