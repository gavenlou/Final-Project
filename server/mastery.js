const fs = require('fs');
const path = require('path');

const searchFile = async file => {
  let test = {};
  await fs.readFile(path.join(__dirname, file), 'utf8', (err, data) => {
    if (err) {
      return err;
    } else {
      test = JSON.parse(data);
    }
  });
  return test;
};

const getMastery = async summMastery => {
  let result = '';
  const info = await searchFile('/Data Dragon/12.5.1/data/en_US/champion.json');
  for (const x in info.data) {
    if (info.data[x].key === summMastery) {
      result = x;

    } else {
      result = 'Not Found';
    }
  }
  return result;
};

module.exports = getMastery;
