import express from "express";
import getTableData from "./access-data";

const app = express();

app.get("/data", function (req, res) {
  getTableData()
    .then(({ headers, statusCode, data }) =>
      res.set(headers).status(statusCode).send(data)
    )
    .catch((e) => res.status(500).end());
});

app.listen(3000, () => console.log(`Listening on port 3000`));
