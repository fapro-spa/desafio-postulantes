/*Propuesta solución para Desafío Postulantes FAPRO, para el cargo BACK DEVELOPER*/ 


const express = require('express');
const res = require('express/lib/response');
const puppeteer = require('puppeteer');

//En caso que el hosting de una puerta distinta al 5000, se tomará la variable de ambiente dada por process.env 
const app = express();
app.use(express.json());

const urlSii = 'https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html';

async function getNominaSii () {
    const browser = await puppeteer.launch({ignoreHTTPSErrors: true});
    const page = await browser.newPage();
    
    await page.setDefaultNavigationTimeout(0);
    await page.goto(urlSii);

    let tableDataSii = await page.evaluate(() => {
            const thTag = document.querySelectorAll('#tabledatasii > thead > tr > th');
            const llaves = [];

            for (let element of thTag){
                llaves.push(element.innerHTML);
            }
            return llaves;
        });
    
    let largo = tableDataSii.length;

    const tableAllData = await page.evaluate(({tableDataSii,largo}) => {
        const elements = document.querySelectorAll('#tabledatasii > tbody > tr > td');
        const valores = [];
        let cont = 0;
        let val = {};

        for (let element of elements){
            val[tableDataSii[cont]] = element.innerText;
            cont ++;
            if(cont === largo){
                cont = 0;
                valores.push(val);
                val = {};
            }
        }
        
        return valores;
    },{tableDataSii,largo});

    await browser.close();
    return tableAllData;
}

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
    console.log('Servidor ejecutandose en puerto', app.get('port'));
});

app.get('/api/nominas', async (req,res) => {
    let nominas = await getNominaSii();
    res.send(nominas);
});