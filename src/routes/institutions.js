const { Router } = require('express')
const router = Router();

const { getAll } = require('../controllers/Institutions')

router.get('/all', getAll);

module.exports = router;