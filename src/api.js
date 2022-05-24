const express = require('express');
const routes = require('./routes/index');
const { HTTP_INTERNAL_SERVER_ERROR_STATUS } = require('./utils/status-HTTP');
require('dotenv').config();

// ...

const app = express();

app.use(express.json());

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });

  return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS).json({ message: err.message });
});

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
