import json
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import os

#elimina el json en caso de estar creado para evitar errores
if os.path.exists("../webscrapping/jsonFile.json"):
    os.remove('../webscrapping/jsonFile.json')

# funcion para obtener la data de la pagina web
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html")

#listas vacias para almacenar arrays de datos
listKeys = []
listaDatos = []
columnas = []

page = BeautifulSoup(driver.page_source, 'html.parser')
box = page.find('div', class_='col-sm-9 contenido')
title = page.find('h2', class_='title')
p2 = box.findAll('p')

#obtengo los datos del titulo de la seccion y parrafos y los almaceno en sus listas
for idx, title in enumerate(title):
    listKeys.append([])
    if title.name == None:
        listKeys[idx].append("Sin tag/Generado por javascript")
    else:
        listKeys[idx].append(title.name)
    listKeys[idx].append(title.text)
    

for index, p in enumerate(p2,start=len(listKeys)):
    listKeys.append([])
    listKeys[index].append(p.name)
    listKeys[index].append(p.text)

#genero un dataframe para ordenar los datos y almacenarlos en un json
df1 = pd.DataFrame(listKeys, columns=['Tag', 'Text'])
parsedTags = json.loads((df1.to_json( orient='records')))

#obtengo nombres de las columnas de la pagina web
tablaNombres = page.find('table', id="tabledatasii")
ColumnaNombre = tablaNombres.findAll('th')

for columna in ColumnaNombre:
    columnas.append(columna.text)

#obtengo los datos de la tabla y los almaceno en una lista
tablaDatos = page.find('tbody')
filas = tablaDatos.findAll('tr')

for indx, fila in enumerate(filas):
    listaDatos.append([])
    datos = fila.findAll('td')
    for dato in datos:
        listaDatos[indx].append(dato.text)

#genero un dataframe con los nombres de las columnas y los datos para almacenarlos en un json
df = pd.DataFrame(listaDatos, columns=columnas)
parsedData = json.loads((df.to_json( orient='records')))

#union de json con datos de la tabla y de la seccion
parsedTags.append(parsedData)
jsonFile = open("jsonFile.json", "a", encoding='utf-8')
jsonFile.write(json.dumps(parsedTags, indent=4, ensure_ascii= False))
jsonFile.close()