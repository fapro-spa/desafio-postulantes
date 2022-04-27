const puppeteer = require('puppeteer');

const getAll = async (req, res) => {

    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html');

        const ths = await page.evaluate(() => {
            const rows = document.querySelectorAll('#tabledatasii thead tr');
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('th');
                return Array.from(columns, column => column.innerText);
            });
        });

        const tds = await page.evaluate(() => {
            const rows = document.querySelectorAll('#tabledatasii tbody tr');
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            });
        });

        let data = []

        tds.map((element) => {
            let item = Object.fromEntries(
                ths[0].map((el, index) => [el, element[index]])
            );
            data.push(item);
        }
        )

        return res.json(data)

    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAll };