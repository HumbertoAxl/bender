const fetch = require('node-fetch');

exports.listarProdutosPorSKU = async function (sku, quantidadeSKU, quantidadeProduto) {
  let nome, marca, linkImagem, linkProduto, resultado = []
  for (let i = 0; i < quantidadeSKU; i++) {
    const url = `https://tfcvb6.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/${sku[i]}?sc=1`;
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
      .then(function (json) {
        linkImagem = `<tr><td><img src=${json.ImageUrl}></td>`
        nome = `<td>${json.NameComplete}</td>`
        marca = `<td>${json.BrandName}</td>`
        itens = `<td>${quantidadeProduto[i]}</td>`
        linkProduto = `<td><a target="_blank" href=https://www.ferimport.com.br${json.DetailUrl}>Link<\a></td></tr>`
        let a = linkImagem + nome + marca + itens + linkProduto
        resultado.push(a)
      }).catch(err => console.error('error:' + err));
  }
  return resultado
}