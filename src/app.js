const express = require("express");
const { getData } = require("./index");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const information = await getData();
    res.send(information);
  } catch (error) {
    console.log(error);
  }
});

server.listen({ port: 3001 }, () => {
  console.log("listening at port: 3001");
});