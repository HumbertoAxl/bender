const fetch = require('node-fetch');

const url = 'https://apiexamples.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunit?refId=27';
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-VTEX-API-AppKey': 'vtexappkey-tfcvb6-KGHSZZ',
    'X-VTEX-API-AppToken': 'BTKEFIGCSSFTKKUCQARNZXRORFHNHMARCOADHKNVVFURUVZTFASAVNJDCVMZASUFSORWJQVGMWRTCZUWGOIGUZWOEXALXOUDLOYGDDKPELNYVQACBQTLKNLTRDRLPJJY'
  }
};

fetch(url, options)
  .then(res => res)
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));