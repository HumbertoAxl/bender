let express = require('express');
let bodyParser = require('body-parser');
const benderMail = require('./monkey_modules/benderMail/benderMail')
const { SMTPClient } = require('emailjs');
const tratarData = require('tratardata');
let app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/'));
app.set('views', __dirname +'/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/Sandbox/sandbox.html', function(req, res){
  res.redirect('/')
});

app.listen(app.get('port'), function() {
});

app.get('/teste', function(req, res) {
  // res.send(benderMail.send(req.params.destinatario, 'Teste 2 de email pelo site do bender', 'Email enviado pelo site do Bender!'))
  try {
    res.send('Email enviado com sucesso!2')
    // res.send(benderMail.send('bender.ferimport@gmail.com', 'FerimportBot', 'humberto.axl@ferimport.com.br', 'teste', 'teste'))
    } catch (e) {
        // console.log('Senha ou email errados, tente novamente!2')
        res.send('Senha ou email errados, tente novamente!2')
    }
})