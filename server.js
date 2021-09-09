let express = require('express');
let bodyParser = require('body-parser');
const bendermail2 = require('./monkey-modules/bender-mail2/bender-mail2');
const benderSheets = require('./monkey-modules/bender-sheets/bender-sheets')
let app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/Sandbox/sandbox.html', function (req, res) {
  res.redirect('/')
});

app.listen(app.get('port'), function () {
});

app.post('http://localhost/email/', async function (req, res) {
  let status = await bendermail2.send(req.body.nomeAtendente, req.body.emailAtendente, req.body.senhaAtendente, req.body.nomeCliente, req.body.emailCliente, 'Pedido número ' + req.body.numeroPedido + ' - ' + req.body.tipoSolicitacao,
    'Olá ' + req.body.nomeCliente + '!\nRecebemos sua solicitação referente ao pedido ' + req.body.numeroPedido + ' feito no dia ' + req.body.dataPedido + ' e já estamos analisando o caso, em breve entraremos em contato'
  )
  res.sendStatus(status)
})

app.post('http://localhost/googlesheets/', async function (req, res) {
  const doc = benderSheets.id('1Z6erjnZX3RRM1_DDhph60UHwBKVTs1aHWUg3wNbvPD8')
  await doc.useServiceAccountAuth(benderSheets.credencials);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle['SAC']
  sheet.addRows([
    {Responsável: req.body.responsavel,
    Solicitação: req.body.solicitacao,
    Motivo: req.body.motivo,
    Pedido: req.body.pedido,
    Status: "Pendente",
    Nome_Cliente: req.body.nomeCliente,
    Data_Pedido: req.body.dataPedido,
    Valor_Pedido: req.body.valorPedido,
    Data_Solicitação: req.body.dataSolicitacao,
    Detalhes: req.body.detalhes,
    SKU_Produto: req.body.SKU,
    Forma_Pagamento: req.body.formaPagamento,
    Nota_Fiscal: req.body.notaFiscal,
    Observações: req.body.observacoes}
  ])
})