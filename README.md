# Desafio Postulantes
Con el fin de seleccionar a nuestros 2 developers, tenemos el siguente desafio.

De la siguente URL [Link](https://www.sii.cl/servicios_online/1047-nomina_inst_financieras-1714.html) es necesario crear un código que sea capaz de parsear la pagina web y devolver un json con esta información.
![image](https://user-images.githubusercontent.com/3030497/164536276-9eb79d10-4fb0-4943-a15f-2536a8586330.png)

El JSON de respuesta puede venir en el formato que estimes conveniente.
## Presentado por Robert Bellorin
### Es necesario activar entorno de desarrollo python
En mi caso lo hice en windows 11

```sh
cd desafio-postulantes
.\.venv\Scripts\activate
uvicorn main:app --reload

```

## API
Hice una pequeña api puedes entrar aqui para ver resultado final

http://127.0.0.1:8000


## Conocer su funcionamiento.

http://127.0.0.1:8000/docs



## Preguntas Frecuentes

- Tipos de entrega, cualquiera de los siguiente sirve
  - API caso generico
  - API caso particular
  - Script para el caso particular
- Lenguaje: El que más te guste (use python ✨Magic ✨)
- Plazo de Entrega: Indefinido, iremos entrevistando a los que van terminando primero.


## Herramientas

Tecnologias usadas
- [FastAPI] - Herramienta para crear api rapidas
- [chromedriver] - Navegador para pruebas
- [code](https://code.visualstudio.com) - text editor


## License

MIT

**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [FastAPI]: <https://fastapi.tiangolo.com>
   [chromedriver]: <https://chromedriver.chromium.org/downloads>
  