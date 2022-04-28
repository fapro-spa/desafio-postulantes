import puppeteer from "puppeteer";
import jsdom from "jsdom";




(async () => {
  const url = "file:///media/reynaldo/f8db0900-b42d-4b5d-971f-4716687f2a60/fapro-pruebaTecnica/htmlSII/SII%20_%20Servicio%20de%20Impuestos%20Internos.html"
  
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  const response=await page.goto(url);

  const body=  await response.text()

  const { window: { document } } = new jsdom.JSDOM(body);

  let keys=[]
  document
    .querySelectorAll("table thead tr th")
    .forEach((element) => keys.push(element.textContent));
  
  let values = []
  
  document
    .querySelectorAll("table tbody tr td")
    .forEach((element) => values.push(element.textContent));

  let newArray = []
  while (values.length !== 0) {
    let arrays=[]
    for (let i = 0; i <7; i++){
      arrays.push(values[i]);
    }
    values.splice(0, 7)
    newArray.push(arrays)

  }
  let final=[]
  for (let i = 0; i < newArray.length; i++){
    let objetos = new Object();
    for (let j = 0; j < newArray[i].length; j++){
    
      
      objetos[keys[j]] = newArray[i][j];

    };
    final.push(objetos)
  };
  console.log(final)

  await browser.close();
})(); 

