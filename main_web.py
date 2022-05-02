import asyncio
from pyppeteer import launch

class Empresa:
    def __init__(self, index, name, location, inscription_data, validity, last_update_data, status):
        self.index = index
        self.name = name
        self.location = location
        self.inscription_data = inscription_data
        self.validity = validity
        self.last_update_data = last_update_data
        self.status = status
    def __str__(self):
        return '{}'.format('raimundo')

async def main():

    browser = await launch() # launch chromium browser in the background
    page = await browser.newPage()
    await page.goto("https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html")

    table_headers_list = []
    table_headers = await page.querySelectorAll('#tabledatasii thead tr')
    for header in table_headers:
        ths = await header.querySelectorAll("th", )

        for th in ths:
            text = await page.evaluate('(element) => element.textContent', th)
            table_headers_list.append(text)


    empresas_list = []
    empresa_lista_auxiliar = []
    table_rows = await page.querySelectorAll("#tabledatasii tbody tr")
    for row in table_rows:
        tds = await row.querySelectorAll("td", )

        for td in tds:
            text = await page.evaluate('(element) => element.textContent', td)
            empresa_lista_auxiliar.append(text)

    aux = []
    for dato in empresa_lista_auxiliar:
        aux.append(dato)
        if len(aux) == 7:
            empresas_list.append(Empresa(aux[0], aux[1], aux[2], aux[3], aux[4], aux[5], aux[6]))
            aux = []

    file = open('nomina' + '.json', 'w')
    file.write('[\n')
    count = 1
    for objeto in empresas_list:
        file.write('    {\n')
        file.write('        ' + '"' + table_headers_list[0] + '" : ' + objeto.index + ',\n')
        file.write('        ' + '"' + table_headers_list[1] + '" : "' + objeto.name + '",\n')
        file.write('        ' + '"' + table_headers_list[2] + '" : "' + objeto.location + '",\n')
        file.write('        ' + '"' + table_headers_list[3] + '" : "' + objeto.inscription_data + '",\n')
        file.write('        ' + '"' + table_headers_list[4] + '" : "' + objeto.validity + '",\n')
        file.write('        ' + '"' + table_headers_list[5] + '" : "' + objeto.last_update_data + '",\n')
        file.write('        ' + '"' + table_headers_list[6] + '" : "' + objeto.status + '"\n')
        if count == len(empresas_list):
            file.write('    }\n')
        else:
            file.write('    },\n')
        count += 1
    file.write(']')
    file.close()

    await browser.close()


print("Starting...")
asyncio.get_event_loop().run_until_complete(main())
print("Finished extracting articles titles")
