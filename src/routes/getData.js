const router = require('express').Router();
const institutionController = require('../controllers/institutionController');

const getDataFromPage = new institutionController();

router.get('/institutions', getDataFromPage.getData)

module.exports = router;
