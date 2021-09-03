const { SMTPClient } = require('emailjs');
let erro
exports.send = function (email, senha, destinatarios, assunto, mensagem) {
    const client = new SMTPClient({ user: email, password: senha, host: 'smtp.gmail.com', ssl: true, });
    client.send({ text: mensagem, from: email, to: destinatarios, subject: assunto }, (err, message) => {
        if (err) {
        erro = err
    }
    });
    if (erro) {
        switch (erro) {
            case 2: return 'Email ou senha incorretos!'
            default: return erro
        }
    } else {
        return 'Email enviado com sucesso!'
    }
}
