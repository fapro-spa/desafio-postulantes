const puppeteer = require("puppeteer");

const getData = async () => {
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(
      "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html"
    );
    await page.waitForSelector("#tabledatasii");

    const head = await page.evaluate(() => {
      const thead = document.querySelector("#tabledatasii thead tr");
      const th = Array.from(thead.querySelectorAll("th"));

      let head = th.map((th) => th.innerText);
      return head;
    });

    const register = await page.evaluate(() => {
      let register = [];
      let tbody = document.querySelector("#tabledatasii tbody");
      let trs = Array.from(tbody.querySelectorAll("tr"));
      let tds = [];

      for (const tr of trs) {
        tds = Array.from(tr.querySelectorAll("td"));
        const data = tds.map((td) => td.innerText);
        register.push(data);
      }

      return register;
    });

    let compilation = [];
    register.map((element) => {
      let item = Object.fromEntries(
        head.map((el, index) => [el, element[index]])
      );
      compilation.push(item);
    });

    await browser.close();
    return compilation;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getData };
