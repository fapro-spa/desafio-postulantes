const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/financial/international', (req, res)=>{
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html');        
        const Table = await page.evaluate(() => {
            //Consigue la cabecera de las columnas de la tabla
            let keys=[]
            document.querySelectorAll("table thead tr th")
            .forEach((element) => keys.push(element.textContent.indexOf('(')!==-1 ? element.textContent.slice(0,element.textContent.indexOf('(')-1): element.textContent));

            //Consigue los valores de la tabla
            let values = []
            document.querySelectorAll("table tbody tr td")
            .forEach((element) => values.push(element.textContent));

            //Un arreglo, que cada posición es una fila. Cada objeto contiene las claves(cabecera de la tabla) con su valor correspondiente.  
            let ArrayTable = []
            let largoTabla = values.length/keys.length; //para tener con más seguridad la cantidad de filas de la tabla
            for(i=0;i<largoTabla;i++){
               let line = {}
               for(j=0;j<keys.length;j++){
                   line[keys[j].normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(/ /).join("_")] = values.shift();
               }
               ArrayTable.push(line)
            }

           return ArrayTable
        });

        await browser.close();

        res.status(200).send(JSON.stringify(Table));
    })();
})

module.exports = router;