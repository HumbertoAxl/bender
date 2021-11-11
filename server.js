const express = require('express');
const bodyParser = require('body-parser');
const bendermail2 = require('./monkey-modules/bender-mail2/bender-mail2');
const benderSheets = require('./monkey-modules/bender-sheets/bender-sheets')
const listarProdutosAPI = require('./apis/listarProdutosPorSKU')
const removerImagemAPI = require('./apis/removerImagemPorSKU')
const gerarCategorias = require('./apis/gerarCategorias')
const adicionarProdutosAoKit = require('./apis/adicionarProdutosAoKit')
const pegarInfoKit = require('./apis/pegarInfoKit')
let cookieParser = require('cookie-parser')
let app = express();
app.use(express.static('./'))
app.use(cookieParser())
app.set('port', (process.env.PORT || 8080));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let assinaturaSAC = '\n\nAtenciosamente,\nSAC Ferimport\nAtendimento: 71 3621-6414\nWhatsApp: 71 98152-2466\nhttps://www.ferimport.com.br\nsac@ferimport.com.br'

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index.html');
});

app.listen(app.get('port'), function () {
});

app.post('/email/', async function (req, res) {
  let conteudoEmail
  switch (req.body.pathEmail) {
    // case 'DCC': conteudoEmail = 'Olá ' + req.body.nomeCliente + '!\nRecebemos sua solicitação de devolução referente ao pedido ' + req.body.numeroPedido + ' feito no dia ' + req.body.dataPedido + ' por favor traga o produto para a mesma loja onde o produto foi comprado'
    case 'DCC': conteudoEmail = 'Devolução por motivo do cliente e o cliente irá trazer o produto' + assinaturaSAC
      break
    case 'DCT': conteudoEmail = 'Devolução por motivo de cliente e será enviado por transportadora, custeado pelo mesmo' + assinaturaSAC
      break
    case 'DCF': conteudoEmail = 'Devolução por motivo de cliente e a Ferimport irá coletar o produto' + assinaturaSAC
      break
    case 'DFT': conteudoEmail = 'Devolução por motivo da Ferimport e será enviado por transportadora, custeado pela empresa' + assinaturaSAC
      break
    case 'DFF': conteudoEmail = 'Devolução por motivo da Ferimport e a empresa irá coletar o produto' + assinaturaSAC
      break
    case 'DFC': conteudoEmail = 'Devolução por motivo da Ferimport e o cliente irá trazer o produto' + assinaturaSAC
      break
    case 'TCC': conteudoEmail = 'Troca por motivo do cliente e o cliente irá trazer o produto' + assinaturaSAC
      break
    case 'TCT': conteudoEmail = 'Troca por motivo de cliente e será enviado por transportadora, custeado pelo mesmo' + assinaturaSAC
      break
    case 'TCF': conteudoEmail = 'Troca por motivo de cliente e a Ferimport irá coletar o produto' + assinaturaSAC
      break
    case 'TFT': conteudoEmail = 'Troca por motivo da Ferimport e será enviado por transportadora, custeado pela empresa' + assinaturaSAC
      break
    case 'TFF': conteudoEmail = 'Troca por motivo da Ferimport e a empresa irá coletar o produto' + assinaturaSAC
      break
    case 'TFC': conteudoEmail = 'Troca por motivo da Ferimport e o cliente irá trazer o produto' + assinaturaSAC
      break
  }
  res.sendStatus(await bendermail2.send(req.body.nomeAtendente, req.body.emailAtendente, req.body.senhaAtendente, req.body.nomeCliente, req.body.emailCliente, 'Pedido número ' + req.body.numeroPedido + ' - ' + req.body.tipoSolicitacao, conteudoEmail))
})

app.post('/googlesheets/', async function (req, res) {
  const doc = benderSheets.id('1Z6erjnZX3RRM1_DDhph60UHwBKVTs1aHWUg3wNbvPD8')
  await doc.useServiceAccountAuth(benderSheets.credencials);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle['SAC']
  sheet.addRows([
    {
      Status: "Pendente",
      Responsável: req.body.responsavel,
      Solicitação: req.body.solicitacao,
      Motivo: req.body.motivo,
      Responsável_Envio: req.body.responsavelEnvio,
      Pedido: req.body.pedido,
      Nome_Cliente: req.body.nomeCliente,
      Data_Pedido: req.body.dataPedido,
      Valor_Pedido: req.body.valorPedido,
      Data_Solicitação: req.body.dataSolicitacao,
      Detalhes: req.body.detalhes,
      SKU_Produto: req.body.SKU,
      Forma_Pagamento: req.body.formaPagamento,
      Nota_Fiscal: req.body.notaFiscal,
      Observações: req.body.observacoes
    }
  ])
})

app.post('/auth/', async function (req, res) {
  if (req.body.email.includes('@ferimport.com.br')) {
    let status = await bendermail2.auth(req.body.email, req.body.senha, req.body.data, req.body.horario)
    if (status == 200) {
      await logLogin(req.body.email, req.body.data, req.body.horario, 'Login', 'Entradas')
    }
    res.sendStatus(status)
  } else {
    let status = 'Externo'
    await logLogin(req.body.email, req.body.data, req.body.horario, 'Externas e sem Auth')
    res.sendStatus(status)
  }
})

app.post('/log/', async function (req, res) {
  res.send(await logLogin(req.body.email, req.body.data, req.body.horario, req.body.caminho, req.body.tabela))
})

async function logLogin(email, data, horario, caminho, tabela) {
  const doc = benderSheets.id('1g6LiHP4yB6CKbGM3nDfA7CLQ3VL23lqi8Sa8-LhGz4U')
  await doc.useServiceAccountAuth(benderSheets.credencials);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[tabela]
  sheet.addRows([
    {
      Email: email,
      Data: data,
      Horário: horario,
      Caminho: caminho,
    }
  ])
}

app.post('/carrinho/', async function (req, res) {
  res.send(await listarProdutosAPI.listarProdutosPorSKU(req.body.sku, req.body.quantidadeSKU, req.body.quantidadeProduto))
})

app.post('/removerImagem/', async function (req, res) {
  try {
    res.send(await removerImagemAPI.removerImagem(req.body.sku, req.body.user))
  } catch (e) {
  }
})

app.get('/listaCategorias/', async function (req, res) {
  let a = await gerarCategorias.main()
  res.send(a)
})

app.post('/KitsVTEX/', async function (req, res) {
  let a = await adicionarProdutosAoKit.adicionar(req.body.idKit, req.body.idProduto, req.body.quantidadeProduto, req.body.precoProduto)
  res.send(a)
})

app.post('/pegarInfoKit/', async function (req, res) {
  let infoKits = await pegarInfoKit.pegarInfo(req.body.idKit)
  // console.log(infoKits)
  let tabelaKits = [], sku = [], quantidadeProduto = [], precos = [], teste = []
  let quantidadeSKU = infoKits.length
  let j = 1
  if (infoKits) {
    for (let i = 0; i < infoKits.length; i++) {
      sku.push(infoKits[i].StockKeepingUnitId)
      quantidadeProduto.push(infoKits[i].Quantity)
      precos.push(infoKits[i].UnitPrice)
    }
    tabelaKits = await listarProdutosAPI.listarProdutosPorSKU(sku, quantidadeSKU, quantidadeProduto)
    tabelaKits = tabelaKits.toString()     
    tabelaKits = tabelaKits.split('<td><a')
    for (let i = 0; i < sku.length; i++) {
      console.log(tabelaKits)
      tabelaKits.splice(j, 0, `<td>${precos[i]}</td><td><a`)
      j = j + 2
    }
    tabelaKits.join(',')
    res.send(tabelaKits)
  } else {
    res.sendStatus(400)
  }
})