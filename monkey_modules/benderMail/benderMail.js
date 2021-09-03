const { SMTPClient } = require('emailjs');
const sweetalert2 = require('../monkeyalert/monkeyalert')
let erro
exports.send = function (email, senha, destinatarios, assunto, mensagem) {
    const client = new SMTPClient({ user: email, password: senha, host: 'smtp.gmail.com', ssl: true, });
    client.send({ text: mensagem, from: email, to: destinatarios, subject: assunto }, (err, message) => {
    erro = err.previous.code
        });
    if (erro = 2) {
        return 'Email ou senhas incorretos!'
        // return sweetalert2.sendMessage()
    }
}
