const { SMTPClient } = require('emailjs');
exports.send = function (email, senha, destinatarios, assunto, mensagem) {
    const client = new SMTPClient({ user: email, password: senha, host: 'smtp.gmail.com', ssl: true, });
    let kek
    client.send({ text: mensagem, from: email, to: destinatarios, subject: assunto }, kek = (err, message) => {
            return err
        });
    let a = kek()
    console.log
    return a
}
