const request = require("request-promise")
const { produtos } = require('./produtos')
const cheerio = require("cheerio")

async function main() {
    for (let i = 0; i < produtos.length; i++) {
        const link = await request.get(produtos[i].toString())
        const $ = await cheerio.load(link)
        let nome = $('h1').text()
        console.log((i+1) + ' - ' + nome)
    }
}