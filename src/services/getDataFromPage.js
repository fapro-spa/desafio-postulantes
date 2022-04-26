const puppeteer = require('puppeteer');
const url = 'https://www.sii.cl';

//function to get data from url
const getDataFromPage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}/servicios_online/1047-nomina_inst_financieras-1714.html`);
  const getTittlePage = await page.evaluate(() => {
    let data = [];
    let rowData = [];
    let dataTableQuerySelector = '#tabledatasii > tbody > tr';
    const rowsId = document.querySelectorAll(dataTableQuerySelector);
    rowsId.forEach((tag) => {
      const td = tag.querySelectorAll('td');
      if(td.length > 0) {
        td.forEach(element => rowData.push(element.textContent));
        data.push({data: rowData});
      }
      rowData = [];
    })
    return data;
  })
  await browser.close();
  
  return getTittlePage;
}

module.exports = getDataFromPage;
