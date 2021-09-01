let express = require('express');
let bodyParser = require('body-parser');
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
  res.send('ok '+ enviarEmail('Humberto <humberto.axl@ferimport.com.br>, Victor <victor.costa@ferimport.com.br>, Guilherme <guilherme.failde@ferimport.com.br>, Luan <luan.cosmo@ferimport.com.br>', 'Teste de email pelo site do bender', 'Email enviado pelo site do Bender!'))
  // res.render('index.html')
})

function enviarEmail (destinatarios, assunto, mensagem) {
  const client = new SMTPClient({
      user: 'bender.ferimport@gmail.com',
      password: 'FerimportBot',
      host: 'smtp.gmail.com',
      ssl: true,
  });
  // send the message and get a callback with an error or details of the message that was sent
  client.send(
      {
          text: mensagem,
          from: 'Bender <bender.ferimport@gmail.com>',
          to: destinatarios,
          subject: assunto,
      },
      (err, message) => {
          console.log(err || message);
      }
  );
}
