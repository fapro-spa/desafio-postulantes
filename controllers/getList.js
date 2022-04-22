const axios = require('axios');
const { csvtojson } = require("../middlewares/index");
require("dotenv").config()

const PATH = process.env.URI;

async function getData() {
    const response = await axios.get(PATH);
    return csvtojson(response.data);
}

const list = (req, res) => {
    getData()
        .then(data => res.json(data))
        .catch(err => res.json("Ha sucedido el siguiente error: "+err));
};

module.exports = list;