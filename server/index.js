require('dotenv/config');
const path = require('path');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const fs = require('fs');

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen((process.env.PORT || 3001), () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT || 3001}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  next();
});

app.get('/summoner/icon/:id', (req, res, next) => {
  const id = req.params.id;
  let pathIcon = '';
  if (id >= 0 && id <= 5268) {
    pathIcon = path.join(__dirname, '/Data Dragon/12.5.1/img/profileicon/', id + '.png');
  } else {
    pathIcon = path.join(__dirname, '/Data Dragon/12.5.1/img/profileicon/', 0 + '.png');
  }
  res.sendFile(pathIcon, err => {
    if (err) {
      throw new ClientError('500', 'Send File Issue.', err);
    }
  });
});

app.get('/summoner/border/:id ', (req, res, next) => {
  const id = req.params.id;
  let pathBorder = '';
  switch (true) {
    case (id >= 0 && id < 30):
      pathBorder = path.join(__dirname, '/Data Dragon/12.5.1/img/mission/', 'EoG_Border_1_4k.png');
      break;
    case (id >= 30 && id < 50):
      pathBorder = path.join(__dirname, '/Data Dragon/12.5.1/img/mission/', 'EoG_Border_30_4k.png');
      break;
    case (id >= 50 && id < 75):
      pathBorder = path.join(__dirname, '/Data Dragon/12.5.1/img/mission/', 'EoG_Border_50_4k.png');
      break;
    case (id >= 75 && id < 100):
      pathBorder = path.join(__dirname, '/Data Dragon/12.5.1/img/mission/', 'EoG_Border_75_4k.png');
      break;
    case (id >= 100 && id < 125):
      pathBorder = path.join(__dirname, '/Data Dragon/12.5.1/img/mission/', 'EoG_Border_100_4k.png');
      break;
    case (id >= 125 && id < 150):
      pathBorder = path.join(__dirname, '/Data Dragon/12.5.1/img/mission/', 'EoG_Border_125_4k.png');
      break;
    case (id >= 150 && id < 175):
      pathBorder = path.join(__dirname, '/Data Dragon/12.5.1/img/mission/', 'EoG_Border_150_4k.png');
      break;
    case (id >= 175):
      pathBorder = path.join(__dirname, '/Data Dragon/12.5.1/img/mission/', 'EoG_Border_175_4k.png');
      break;
    default:
      pathBorder = path.join(__dirname, '/Data Dragon/12.5.1/img/mission/', 'EoG_Border_1_4k.png');
  }
  res.sendFile(pathBorder, err => {
    if (err) {
      throw new ClientError('500', 'Send File Issue.', err);
    }
  });
});

app.get('/summoner/mastery/:id', (req, res, next) => {
  try {
    const summMastery = req.params.id;
    let champions = 'Test';
    fs.readFile(path.join(__dirname, '/Data Dragon/12.5.1/data/en_US/champion.json'), 'utf8', (err, data) => {
      if (err) {
        return err;
      } else {
        const champ = JSON.parse(data);
        for (const x in champ.data) {
          if (champ.data[x].key === summMastery) {
            champions = x;
          }
        }
        res.status(200).json(champions);
      }
    });
  } catch (err) {
    throw new ClientError('500', 'Summoner Mastery not found.', err);
  }
});

app.get('/league/summoner/:IGN', (req, res, next) => {

});

app.use(errorMiddleware);
