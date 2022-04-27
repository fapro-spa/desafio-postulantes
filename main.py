
from fastapi import FastAPI
from selenium import webdriver



class Read:
    page = None
    html = None
    table = []

    def __init__(self, url):

        self.url = url
        
        print(url)
        self.getHtml()
        
    
        
    def getHtml(self):
        # iniciar navegador
        self.browser = webdriver.Chrome()
        # leer url
        self.browser.get(self.url)
        
        self.setTitle(self.browser.find_element_by_class_name("title").text )

        self.setDescription(self.browser.find_element_by_xpath('//*[@id="my-wrapper"]/div[2]/div/div/div[2]/p[2]').text)

        self.setFechaActualizacion(self.browser.find_element_by_xpath('//*[@id="fechaActualizacion"]').text)
        
        self.setTableHeader(self.browser.find_elements_by_xpath('//*[@id="tabledatasii"]/thead/tr/th'))
        
        self.setTableBody(self.browser.find_elements_by_tag_name("tr"))

        self.close()
        

    def setTitle(self, title):
        self.title = title
    
    def setDescription(self, decription):
        self.decription = decription
    
    def setFechaActualizacion(self, fechaActualizacion):
        self.fechaActualizacion = fechaActualizacion

    def setTableHeader(self, header):
        self.header  = header
        row = []
        for i in self.header:
            row.append(i.text)
        
        self.table.append(row)
    
    def setTableBody(self, body):

        self.body  = body

        for i in self.body:
            row = []
            for j in i.find_elements_by_tag_name("td"):
                row.append(j.text)
            
            if (len(row)):
                self.table.append(row)
    
    def close(self):
        self.browser.quit()
        

app = FastAPI()


@app.get("/")
async def root():
    ruta = "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html"
    r = Read(ruta)
    title = r.title
    decription = r.decription
    fechaActualizacion = r.fechaActualizacion
    table = r.table
    
    
    
    return {
        "url" : ruta, 
        "data" :{
            "title": title,
            "decription": decription,
            "fechaActualizacion": fechaActualizacion,
            "table": table,
        }
        }