import urllib.request
import ssl
import pandas as pd
from io import StringIO

# Ignore SSL certificate errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Getting info
url = ('https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.csv?_=1650594875939')
content =  urllib.request.urlopen(url, context=ctx).read().decode("utf-8")

# Convert String into StringIO
csvStringIO = StringIO(content)
df = pd.read_csv(csvStringIO, sep=";")

# Setting info as shown in the web page

df["DATOS INSCRIPCIÓN (DR / RES. No / FECHA)"] = df["DR Inscripción"] \
    + " / " + df["Resolución Inscripción"] + " / " + df["Fecha Inscripción"]

df["DATOS ÚLTIMA ACTUALIZACIÓN (DR / RES. No / FECHA)"] = df["DR Actualización"] \
    + " / " + df["Resolución Actualización"] + " / " + df["Fecha Actualización"]

df.rename(columns = {'ID':'No.', 'Estado':'ESTADO (ACTUALIZADO / EXCLUIDO / PENDIENTE)'}, inplace = True)

df = df[["No.", "Razón Social", "País", "DATOS INSCRIPCIÓN (DR / RES. No / FECHA)", "Vigencia Hasta",
        "DATOS ÚLTIMA ACTUALIZACIÓN (DR / RES. No / FECHA)", "ESTADO (ACTUALIZADO / EXCLUIDO / PENDIENTE)"]]

# Saving info

with open('nomina.json', 'w', encoding='utf-8') as file:     
    df.to_json(file, orient="records", force_ascii=False)
