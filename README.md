# Desafio Postulantes

Con el fin de seleccionar a nuestros 2 developers, tenemos el siguente desafio.

De la siguente URL [Link](https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html) es necesario crear un código que sea capaz de parsear la pagina web y devolver un json con esta información.
![image](https://user-images.githubusercontent.com/3030497/164536276-9eb79d10-4fb0-4943-a15f-2536a8586330.png)

El JSON de respuesta puede venir en el formato que estimes conveniente.

## Preguntas Frecuentes

- Tipos de entrega, cualquiera de los siguiente sirve
  - API caso generico
  - API caso particular
  - Script para el caso particular
- Lenguaje: El que más te guste
- Plazo de Entrega: Indefinido, iremos entrevistando a los que van terminando primero.

## Test development:

This project uses the [Puppeteer](https://github.com/puppeteer/puppeteer) library to get information from a website and save in JSON format, after that you can request that information by making a request an one URL.


The following test is performed with following technologies:
- NodeJS.
- Express JS
- Puppeteer

Tools for test:
- Node JS
- Browser (Chrome)
- JSON viewer extencion [Link](https://chrome.google.com/webstore/detail/json-viewer/aimiinbnnkboelefkjlenlgimcabobli)

Steps to instalation:

- Dowload or clone the project.
- Open the terminal at the project location
- Write the next command to install project dependencies
  ```
  npm install
  ```
- Once the previous step is finished, type the following command. 
This command will start a server to request our data
```
npm run dev
```

- Open the browser and type the following url:
  ```
  http://localhost:3000/institutions
  ```
The previous URL will make a request to get information and return it in JSON format.


