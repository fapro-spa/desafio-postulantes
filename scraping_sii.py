from bs4 import BeautifulSoup
import json
import os
import pandas as pd
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import time
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
url = "https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html"

driver.get(url)
print(driver.get(url))
time.sleep(3)

#Header
link_return_sii =driver.find_element(By.XPATH,"//div[contains(@class,'contenido')]/p[1]/a[1]").text
link_share_sii  =driver.find_element(By.XPATH,"//div[contains(@class,'contenido')]/p[1]/a[2]").text
title_sii       =driver.find_element(By.XPATH,"//div[contains(@class,'contenido')]/h2[1]").text
description_sii =driver.find_element(By.XPATH,"//div[contains(@class,'contenido')]/p[2]").text
lastupdatedate  =driver.find_element(By.ID,'fechaActualizacion').text 

cols   = driver.find_elements(By.XPATH,"//table[@id='tabledatasii']/thead/tr[1]/th")
rows   = driver.find_elements(By.XPATH,"//table[@id='tabledatasii']/tbody/tr")

# header Columns table
columns=[]
for i in range(1,len(cols)+1):
    columns.append(driver.find_element(By.XPATH,"//table[@id='tabledatasii']/thead/tr[1]/th["+str(i)+"]").text)

#Table
data=[]
for i in range(1,len(rows)):
  ro=[]
  for j in range(1, len(cols)+1):
    ro.append(driver.find_element(By.XPATH,"//table[@id='tabledatasii']/tbody/tr["+str(i)+"]/td["+str(j)+"]").text) 
  data.append(ro)

df = pd.DataFrame(data=data,columns=columns)
time.sleep(3)

dicc_data_sii = {"link_return": link_return_sii,
                "link_share": link_share_sii,
                "title" : title_sii,
                "description": description_sii,
                "lastupdatedate": lastupdatedate,
                "dataTable": df.to_dict('records')}

with open('DataSii.json', 'w', encoding='utf8') as json_file:
    json.dump(dicc_data_sii, json_file, indent=4, ensure_ascii=False)
driver.quit()