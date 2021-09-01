const { SMTPClient } = require('emailjs');

exports.send = function (destinatarios, assunto, mensagem) {
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
