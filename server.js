let express = require('express');
let bodyParser = require('body-parser');  
const benderMail2  = require('./monkey_modules/benderMail2/benderMail2');
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

app.post('/teste/', async function (req, res) {
  let a = await benderMail2.send(req.body.senhaAtendente)
  if  (a == 200) {
    console.log('Ok')
  } else {
    console.log('Erro')
  }
  // res.send(benderMail.send('humberto.axl@ferimport.com.br', req.body.senhaAtendente, 'humberto.axl22@ferimport.com.br', 'Teste de email','Teste'
    // 'Olá ' + req.body.nomeCliente + '! Recebemos sua solicitação referente ao pedido ' + req.body.numeroPedido + ' feito no dia ' + req.body.dataPedido + ' e já estamos analisando o caso, em breve entraremos em contato'
  // ))
})