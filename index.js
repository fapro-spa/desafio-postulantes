const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const PORT = 3000;

const app = express();

app.listen(PORT, () => console.log(`Server up en puerto ${PORT}`));
