const puppeteer = require("puppeteer");

const getTable = async () => {
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto(
"https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html"
);
const table = await page.evaluate(() => {
const headers = Array.from(
document.querySelectorAll("#tabledatasii thead tr th")
).map((th) => th.innerText);

const content = Array.from(
document.querySelectorAll("#tabledatasii tbody tr")
).map((tr) => Array.from(tr.children).map((td) => td.textContent));

return { headers, content };
});
browser.close();
return table;
};

const assignHeaders = (headers, row) => {
const holderObj = {};
headers.forEach((header, index) => {
holderObj[header] = row[index];
});
return holderObj;
};

(async () => {
const table = await getTable();
const parsedContent = table.content.map((row) => {
return assignHeaders(table.headers, row);
});
console.log(parsedContent);
})();
