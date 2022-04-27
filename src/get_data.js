import puppeteer from "puppeteer";

async function scraper(URL) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    try {
      await page.waitForSelector("table", { timeout: 5000 })
    } catch (error) {
      console.warn("Table not found")
      return []
    }

    let headers = await page.$$eval("thead > tr > th", (rows) => {
      return rows.map((row) => row.innerText);
    });

    const data = await page.$$eval("tbody tr", (rows) => {
      return Array.from(rows, (row) => {
        const cols = row.querySelectorAll("td");
        return Array.from(cols, (col) => col.innerText);
      });
    });

    await browser.close();
    return getKeyValues(headers, data);
  } catch (error) {
    console.error(err);
  }
}


function getKeyValues(keys, values) {
  const arr = [];
  values.forEach((val) => {
    arr.push(keys.reduce((acc, key, index) => {
      acc[key] = val[index];
      return acc;
    }, {}));
  });

  return arr;
}

export default async function getData(URL) {

  return await scraper(URL);

}