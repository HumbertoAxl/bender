let express = require('express');
let bodyParser = require('body-parser');
const benderMail2 = require('./monkey_modules/benderMail2/benderMail2');
let app = express();
app.set('port', (process.env.PORT || 5005));
app.use(express.static(__dirname + '/'));
app.set('views', __dirname + '/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('./index/index.html');
});

app.get('/Sandbox/sandbox.html', function (req, res) {
  res.redirect('/')
});

app.listen(app.get('port'), function () {
});

app.post('/email/', async function (req, res) {
  let nomeAtendente
  switch (req.body.emailAtendente) {
    case 'bender.ferimport@gmail.com': nomeAtendente = 'Bender'
      break
    default:
  }
  let status = await benderMail2.send(nomeAtendente, req.body.emailAtendente, req.body.senhaAtendente, req.body.nomeCliente, req.body.emailCliente, 'Pedido número ' + req.body.numeroPedido + ' - ' + req.body.tipoSolicitacao,
    'Olá ' + req.body.nomeCliente + '!\nRecebemos sua solicitação referente ao pedido ' + req.body.numeroPedido + ' feito no dia ' + req.body.dataPedido + ' e já estamos analisando o caso, em breve entraremos em contato'
  )
  res.sendStatus(status)
})