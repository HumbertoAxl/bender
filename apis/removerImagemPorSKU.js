const fetch = require('node-fetch');
let status
exports.removerImagem = async function (sku, user) {
    if (user == 'humberto.axl' || user == 'victor.costa' || user == 'luan.cosmo' || user == 'guilherme.failde') {
        const url = `https://tfcvb6.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunit/${sku}/file`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-VTEX-API-AppKey': 'vtexappkey-tfcvb6-KGHSZZ',
                'X-VTEX-API-AppToken': 'BTKEFIGCSSFTKKUCQARNZXRORFHNHMARCOADHKNVVFURUVZTFASAVNJDCVMZASUFSORWJQVGMWRTCZUWGOIGUZWOEXALXOUDLOYGDDKPELNYVQACBQTLKNLTRDRLPJJY'
            }
        };
        await fetch(url, options)
        .then(function (res) {
        status = res.status
        })
        return status
    } else {
        return status = 403
    }
}