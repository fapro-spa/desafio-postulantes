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

# SOLUCIÓN
## PASOS:
- Para poder generar los datos en formaro JSON primero descargue la página, 
  1. Clona el repositorio 
      - git clone https://github.com/REYNALDOz/desafio-postulantes.git
  2. Dirigase al pyoyecto
      -cd desafio-postulantes
  3. Actualizar los paquetes
      - npm install
  3. Dirigase a la siguiente página https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html
  4. Click derecho y guardar como (Este proceso se realiza porque los th th y tr de la tabla estan escritas en una documentos javascript y si queremos scrapear no se pudo identificar las clases y id, es por ello que se realiza este proceso de guardar.)
  5. Guargar con el mismo nombre por defecto en el carpeta htmlSII de este repositorio
  6. Abra la terminal en el proyecto y ejecuta
      - node src/index.js

