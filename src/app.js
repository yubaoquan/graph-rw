const express = require('express');
const errorHandler = require('./middlewares/error-handler');
const initRoutes = require('./routers');

const app = express();

app.get('/', (req, res) => {
  res.send('server running');
});

initRoutes(app);
app.use(errorHandler);
const port = 8900;
app.listen(port, () => {
  console.info(`http://localhost:${port}`);
});
