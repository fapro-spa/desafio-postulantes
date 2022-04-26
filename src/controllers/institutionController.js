const getDataFromPage = require('../services/getDataFromPage');

class InstitutionController {
  //method to send JSON data
  async getData(req,res) {
    const data = await getDataFromPage();
    const response = data.map(item => {
      return {
        id: item.data[0],
        razonSocial: item.data[1],
        pais: item.data[2],
        datosInscripcion: item.data[3],
        vigencia: item.data[4],
        ultimaActualizacion: item.data[5],
        estado: item.data[6]
      }
    });
    res.json(response);
  }
}

module.exports = InstitutionController;
