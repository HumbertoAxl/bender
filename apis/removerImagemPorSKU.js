const fetch = require('node-fetch');
let status, statusReturn
exports.removerImagem = async function (sku, user) {
    let resultado = []
    sku = sku.replace(/ /g, '').split(',')
    if (user == 'humberto.axl' || user == 'victor.costa' || user == 'luan.cosmo' || user == 'guilherme.failde') {
        for (let i = 0; i < sku.length; i++) {
            const url = `https://tfcvb6.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunit/${sku[i]}/file`;
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
                    if (status == 200) {
                        statusReturn = 'Imagens removidas'
                    } else {
                        statusReturn = 'Não encontrado'
                    }
                    resultado.push(`<tr><td>${sku[i]}</td><td>${statusReturn}</td></tr>`)
                })
        }
        console.log(resultado)
        return resultado
    } else {
        return status = 403
    }
}