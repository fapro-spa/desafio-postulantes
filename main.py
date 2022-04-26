import os
import requests
import pandas as pd
from selenium import webdriver
from decouple import config
from webdriver_manager.firefox import GeckoDriverManager
from bs4 import BeautifulSoup
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.firefox.service import Service

# Get environment variable for URL
URL_TABLE = config('URL_TABLE')
TABLE_ID = config('TABLE_ID')

s = Service(GeckoDriverManager().install())
options = FirefoxOptions()
options.add_argument("--headless")

def getURL():
    driver = webdriver.Firefox(service=s,options=options)
    print("URL donde obtener tabla:")
    print(str(URL_TABLE))
    driver.get(str(URL_TABLE))
    
    content = driver.page_source
    soup = BeautifulSoup(content, "html.parser")
        
    # Find table 'tabledatasii'
    table = soup.find("table", {"id": str(TABLE_ID)})
    
    # Set up head of table
    cabecera = []
    heads = table.thead.find_all('tr')[0]
    
    for row in heads.find_all('th'):
        cabecera.append(row.text)
    
    # Set up data of table
    datos = []    
    for row in table.tbody.find_all('tr'):
        datosRow = []
        for dato in row.find_all('td'):
            datosRow.append(dato.text)
        datos.append(datosRow)
    
    # Defining of the dataframe
    df = pd.DataFrame(datos, columns = cabecera)

    driver.close()
    return df

if __name__ == "__main__":
    print("Init programa")
    salida = getURL()
    salida.to_csv('/app/resultado/out.csv',index=False)
    salida.to_json('/app/resultado/json.txt')
    print("Fin Programa")
