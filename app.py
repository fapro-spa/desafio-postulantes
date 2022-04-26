from selenium import webdriver
from bs4 import BeautifulSoup
from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def index():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)

    driver.get('https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html')
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    table_data = [[cell.text for cell in row("td")] for row in soup("tr")]
    th = [cell.text for cell in soup("th")]
    data = []
    for tr in table_data:
        ob = {}
        if len(tr) > 0:
            for i in range(len(tr)):            
                ob[th[i]] = tr[i]
        data.append(ob)
    print(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)