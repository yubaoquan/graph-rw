const express = require('express');
const { port } = require('./config/config.default');
const initGraphql = require('./graphql');
const errorHandler = require('./middlewares/error-handler');
const initRoutes = require('./routers');

const app = express();

initGraphql(app);
initRoutes(app);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`http://localhost:${port}`);
});
