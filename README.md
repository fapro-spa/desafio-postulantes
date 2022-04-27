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

# Instalación

Se debe de tener instalado Python versión mayor a 3

Se debe clonar el repositorio, una vez descargado se debe crear un entorno virtual en la máquina local, para ello debe abrir la consola cmd ubicarse en la carpeta ejecutar 
 
> py -m venv "nombre del entorno"

Activar entorno Virtual:

Si se encuentra en el sistema operativo Windows sería el siguiente:

nombredelentorno\Scripts\activate

Una vez activado el entorno virtual se procede a instalar los paquetes necesarios para la ejecución del script

> pip install - r requirements.txt

Por último se ejecuta el script con el siguiente comnando:
> py scraping_sii.py

Se debe esperar unos segundos hasta que se ejecute la prueba automatizada y luego dirigirse a la carpeta y abrir el archivo DataSii.json
