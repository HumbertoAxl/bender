const fetch = require('node-fetch');

const url = 'https://tfcvb6.vtexcommercestable.com.br/api/oms/pvt/orders/1163642274175-01';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-VTEX-API-AppKey': 'vtexappkey-tfcvb6-KGHSZZ',
    'X-VTEX-API-AppToken': 'BTKEFIGCSSFTKKUCQARNZXRORFHNHMARCOADHKNVVFURUVZTFASAVNJDCVMZASUFSORWJQVGMWRTCZUWGOIGUZWOEXALXOUDLOYGDDKPELNYVQACBQTLKNLTRDRLPJJY'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json.clientProfileData.firstName))
  .catch(err => console.error('error:' + err));