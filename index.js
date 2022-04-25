const express = require("express");
const puppeteer = require("puppeteer");
const PORT = 3000;
const url =
  "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html";
const app = express();

const scrapeData = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  let siiData = await page.evaluate(() => {
    let thead = document.querySelectorAll(".table thead tr th");
    let titles = {};
    thead.forEach((th, i) => {
      titles[i] = th.textContent;
    });
    const titleOld = document.querySelector(".title").textContent;
    const title = titleOld.replace('menuSOL.escribeLink(1715, "", "", "")', "");
    const description = document.querySelector(".title ~ p").textContent;
    const dateUpdate = document.querySelector("#fechaActualizacion").innerText;

    const arraySiiTableData = [];
    arraySiiTableData.push({ title }, { description }, { dateUpdate });
    let tableRow = document.querySelectorAll(".table tbody tr");
    tableRow.forEach((tr) => {
      const row = {};
      tr.querySelectorAll("td").forEach((td, i) => {
        row[titles[i]] = td.textContent;
      });
      arraySiiTableData.push(row);
    });
    arraySiiTableData.unshift({ count: arraySiiTableData.length - 3 });
    return arraySiiTableData;
  });

  return siiData;
};

app.get("/datos-sii", async (req, res) => {
  try {
    const data = await scrapeData(url);
    res.status(200);
    res.json(data);
  } catch (error) {
    res.status(500);
    res.json({ message: `Ocurrió un error: ${error}` });
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server up en puerto ${PORT}`));
