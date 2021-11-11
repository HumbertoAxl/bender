const fetch = require('node-fetch');

exports.pegarInfo = async function (idKit) {
    let resposta;
    const url = `https://tfcvb6.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunitkit?parentSkuId=${idKit}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-VTEX-API-AppKey': 'vtexappkey-tfcvb6-KGHSZZ',
            'X-VTEX-API-AppToken': 'BTKEFIGCSSFTKKUCQARNZXRORFHNHMARCOADHKNVVFURUVZTFASAVNJDCVMZASUFSORWJQVGMWRTCZUWGOIGUZWOEXALXOUDLOYGDDKPELNYVQACBQTLKNLTRDRLPJJY'
        }
    };

    await fetch(url, options)
        .then(res => res.json())
        .then(json => resposta = json)
        .catch(err => resposta = false);
    return resposta
}