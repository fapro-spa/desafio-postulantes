import puppeteer from "puppeteer";

const url = "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html";

interface IInstitution {
    number: string;
    businessName: string;
    country: string;
    registrationData: string;
    validityUntil: string;
    dataLastUpdate: string;
    state: string;
}

const formatArr = (arr: Array<string | null>) => {
    const formated: IInstitution = {
        number: arr[0] || 'NONE',
        businessName: arr[1] || 'NONE',
        country: arr[2] || 'NONE',
        registrationData: arr[3] || 'NONE',
        validityUntil: arr[4] || 'NONE',
        dataLastUpdate: arr[5] || 'NONE',
        state: arr[6] || 'NONE',
    }
    return formated;
}

const getScrapedData = async () => {

    let header = {};
    let data: Array<IInstitution> = [];

    try {

        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'load' });

        const rows = await page.$$('table#tabledatasii tr');

        const arrHeaders = (await rows.shift()?.$$eval('th', element => element.map(item => item.textContent))) || [];

        header = formatArr(arrHeaders);

        const promises = rows.map(row => row.$$eval('td', element => element.map(item => item.textContent)));

        const arrRows = await Promise.all(promises);

        data = arrRows.map(row => {
            return formatArr(row);
        });

        await browser.close();

    } catch (error) {
        console.error(error);
    }

    return { header, data };
}

export { getScrapedData };