const express = require('express');
const routerInstitution = require('./src/routes/getData');
const app = express();

const PORT = 3000;

app.use('/', routerInstitution);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})
