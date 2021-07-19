// let produto = document.getElementById('linkProduto').value

const puppeteer = require('puppeteer');
// const fs = require('fs');
const { produtos } = require('./produtos.js')
let resultado = [];
let marca, codigo

async function pegarMarca ()  {
    let browser = await puppeteer.launch({ headless: true, defaultViewport: null });
    let page = await browser.newPage();
    for (let i = 0; i < produtos.length; i++) {
        let url = produtos[i].toString()
        if (url.includes('lojadomecanico')) {
            await goto_LojadoMecanico(page, i, browser, url)
        } else if (url.includes('ferramentaskennedy')) {
            await goto_FerramentasKennedy(page, i, browser, url)
        } else if (url.includes('dutramaquinas')) {
            await goto_DutraMaquinas(page, i, browser, url)
        } else {
            console.log('----- Erro: Não há scripts setados pra esse concorrente -----');
        }
    }
    browser.close()
    return resultado
}

pegarMarca().then((resultado) => {
    console.table(resultado)
    // let fileContent = JSON.stringify(resultado);
    // fs.writeFileSync('./Work/GetProductsInfo/ScrapeMarcasInfo.json', fileContent);
})

async function goto_LojadoMecanico(page, i, browser, url) {
    browser = await puppeteer.launch({ headless: true, defaultViewport: null });
    page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2' })
        marca = await page.evaluate(() => {
            try {
                return document.querySelector('.col-sm-12.colzero b').innerHTML
            } catch (e) {
                marca = "Não encontrada"
            }
        })
        codigo = await page.evaluate(() => {
            try {
                let tratarCodigo = document.querySelector('div.col-xs-12.col-sm-9.colzero').innerHTML
                tratarCodigo = tratarCodigo.replace('Ref.:', 'SEPARADORFERIMPORT2021')
                tratarCodigo = tratarCodigo.split('SEPARADORFERIMPORT2021')
                tratarCodigo = tratarCodigo[1]
                tratarCodigo = tratarCodigo.split('</p>')
                tratarCodigo = tratarCodigo[0]
                if (tratarCodigo[0] = ' ') {
                    tratarCodigo = tratarCodigo.substring(1)
                }
                if (tratarCodigo[tratarCodigo.length - 1] = ' ') {
                    tratarCodigo = tratarCodigo.substring(0,[tratarCodigo.length-1])
                }
                // tratarCodigo = tratarCodigo.match(/Ref\.: ?([A-Z\-0-9]+)/i)
                return tratarCodigo
            } catch (e) {
                codigo = "Não encontrado"
            }
        })
        resultado.push({ url, marca, codigo })
    } catch (e) {
    }
    console.log(i)
    browser.close()
    return resultado
}

async function goto_DutraMaquinas(page, i, browser, url) {
    browser = await puppeteer.launch({ headless: true, defaultViewport: null });
    page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2' })
        marca = await page.evaluate(() => {
            try {
                return document.querySelector('.tit-fornecedor a').innerHTML
            } catch (e) {
                marca = "Não encontrada"
            }
        })
        codigo = await page.evaluate(() => {
            try {
                let tratarCodigo = document.querySelector('td.cod-produto:nth-of-type(4)').innerHTML
                if (tratarCodigo[0] = " ") {
                    tratarCodigo = tratarCodigo.substring(1)
                }
                if (tratarCodigo[tratarCodigo.length - 1] = ' ') {
                    tratarCodigo = tratarCodigo.substring(0,[tratarCodigo.length-1])
                }
                return tratarCodigo
            } catch (e) {
                codigo = "Não encontrado"
            }
        })
        resultado.push({ url, marca, codigo })
    } catch (e) {
    }
    console.log(i)
    browser.close()
    return resultado
}

async function goto_FerramentasKennedy(page, i, browser, url) {
    browser = await puppeteer.launch({ headless: true, defaultViewport: null });
    page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle2' })
        page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.dismiss();
        });
        marca = await page.evaluate(() => {
            try {
                return document.querySelector('.col-6.col-md-12 a').innerHTML
            } catch (e) {
                return marca = "Não encontrada"
            }
        })
        codigo = await page.evaluate(() => {
            try {
                return document.querySelector(".section-content tr:nth-last-child(4) th:nth-of-type(2)").innerHTML
            } catch (e) {
                return codigo = "Não encontrado"
            }
        })
        resultado.push({ url, marca, codigo })
    } catch (e) {
        console.log(e)
    }
    console.log(i)
    browser.close()
    return resultado
}