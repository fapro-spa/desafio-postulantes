import get_data from "./get_data.js";
import express from "express"

const URL = "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html";
const app = express();


app.get("/", function (req, res) {
  get_data(URL).then((data) => {
    const statusCode = data.length > 0 ? 200 : 404
    res.set({
      "Content-Type": "application/json",
    }
    ).status(statusCode).send(JSON.stringify(data))
  }
  ).catch((e) => {
    res.status(500).end()
  });

});

export default app;