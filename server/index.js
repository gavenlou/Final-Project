require('dotenv/config');
const path = require('path');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});

app.get('/summoner/icon/:id', (req, res, next) => {
  const id = req.params.id;
  const pathIcon = path.join(__dirname, '/Data Dragon/11.23.1/img/profileicon/', id + '.png');
  res.sendFile(pathIcon, err => {
    if (err) {
      throw new ClientError('500', 'Send File Issue.', err);
    }
  });
});

app.get('/league/summoner/:IGN', (req, res, next) => {

});
