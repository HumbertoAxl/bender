async function main() {
    var requirejs = require("requirejs");
// var fs = requirejs("fs");
    const request = requirejs("request-promise")
    let produtos = [['https://www.lojadomecanico.com.br/produto/140035/21/227/base-retangular-6-pol-para-lixadeira-ch-o-50--chiaperini-13711-']
    ['https://www.lojadomecanico.com.br/produto/122747/2/253/cabeca-branco-em-abs-para-martelo-922-44-robust-923-44e'],]
    const cheerio = requirejs("cheerio")
    for (let i = 0; i < 1; i++) {
        const link = await request.get(produtos[i].toString())
        const $ = await cheerio.load(link)
        let nome = $('h1').text()
        console.log((i + 1) + ' - ' + nome)
    }
}