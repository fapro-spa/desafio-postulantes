//Here is where the magic happen the scraper

class ScraperObject {
  async scraper(browser) {
    const url =
      "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html";
    //open browser new page then go to the URL
    let page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    // Wait for the required DOM to be rendered
    await page.goto(url, { waitUntil: "load" });
    //Point to the table data
    const table = await page.$$("table#tabledatasii > tbody > tr");
    const getTableData = table.map((e) =>
      e.$$eval("td", (el) => el.map((item) => item.textContent))
    );
    //Because the $$eval return Promises have to await all the promises
    const waitForPromises = await Promise.all(getTableData);
    //delete empty data
    const filterEmptyArray = waitForPromises.filter((i) => i.length !== 0);
    //create de json
    const createObject = filterEmptyArray.map((e) => {
      return {
        ID: Number(e[0]),
        business_name: e[1],
        country: e[2],
        register: e[3],
        validity_state: e[4],
        updateDate: e[5],
        state: e[6],
      };
    });

    console.log(...createObject, "table");
    await browser.close();
    return createObject;
  }
}

export const scraperObject = new ScraperObject();
