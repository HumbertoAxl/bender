const fetch = require('node-fetch');

const url = 'https://tfcvb6.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunitkit';
exports.adicionar = async function (idKit, idProduto, quantidadeProduto, precoProduto) {
    let resposta = []
    for (let i = 0; i < idProduto.length; i++) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-VTEX-API-AppKey': 'vtexappkey-tfcvb6-KGHSZZ',
                'X-VTEX-API-AppToken': 'BTKEFIGCSSFTKKUCQARNZXRORFHNHMARCOADHKNVVFURUVZTFASAVNJDCVMZASUFSORWJQVGMWRTCZUWGOIGUZWOEXALXOUDLOYGDDKPELNYVQACBQTLKNLTRDRLPJJY'
            },
            body: JSON.stringify({
                StockKeepingUnitParent: idKit, //ID do Kit
                StockKeepingUnitId: idProduto[i], //ID do produto a ser adicionado
                Quantity: quantidadeProduto[i], //Quantidade do produto
                UnitPrice: precoProduto[i] //Preço do produto
            })
        };
        await fetch(url, options)
            .then(res => resposta.push(res.status))
            .catch(err => console.error('error: ' + err));
    }
    console.log(resposta)
    return resposta
}