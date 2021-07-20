const request = require("request-promise")
const cheerio = require("cheerio")

const produtos = [
['https://www.lojadomecanico.com.br/produto/140035/21/227/base-retangular-6-pol-para-lixadeira-ch-o-50--chiaperini-13711-'],
['https://www.lojadomecanico.com.br/produto/122747/2/253/cabeca-branco-em-abs-para-martelo-922-44-robust-923-44e']
]

async function main() {
    for (let i = 0; i < produtos.length; i++) {
        const link = await request.get(produtos[i].toString())
        const $ = await cheerio.load(link)
        let nome = $('h1').text()
        console.log((i+1) + ' - ' + nome)
    }
}

main()