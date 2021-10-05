const fetch = require('node-fetch');
let status
exports.removerImagem = async function (sku, user) {
    // if (user == 'humberto.axl' || user == 'victor.costa' || user == 'luan.cosmo' || user == 'guilherme.failde') {
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
        await (await fetch(url, options))
            .then(res => console.log('res json: '+res.json()))
            .then(json => console.log('json: '+json))
            // .then(function (json) {
            //     console.log(json)
            //     console.log(`ok = ${status}`)
            //     status = json
                // return 403
            // })
            .catch(err => function () {
                status = err
                console.log(`erro = ${status}`)
                return status
            })
    // } else {
        // status = 403
        // return status
    // }
}