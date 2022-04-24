import puppeteer from "puppeteer";

const URL =
  "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html";

/* 
  Función que permite obtener los datos de la tabla
*/
async function scraperData() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    let keys = await page.$$eval("thead > tr > th", (links) => {
      return links.map((link) => link.innerText);
    });

    const data = await page.$$eval("tbody tr", (rows) => {
      return Array.from(rows, (row) => {
        const columns = row.querySelectorAll("td");
        return Array.from(columns, (column) => column.innerText);
      });
    });

    await browser.close();
    return normalizeData(keys, data);
  } catch (error) {
    console.error(err);
  }
}

/* 
  Función que retorna la asociación de los datos en el formato clave/valor
*/
function normalizeData(keys, data) {
  const normalized = [];
  data.forEach((values) => {
    normalized.push(
      keys.reduce((acc, key, index) => {
        acc[key] = values[index];
        return acc;
      }, {})
    );
  });

  return normalized;
}

export default function getTableData() {
  return scraperData().then((data) => {
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(data),
    };
  });
}
