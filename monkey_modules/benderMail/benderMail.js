const { SMTPClient } = require('emailjs');

exports.send = function (email, senha, destinatarios, assunto, mensagem) {
    const client = new SMTPClient({
        user: email,
        password: senha,
        host: 'smtp.gmail.com',
        ssl: true,
    });
    // send the message and get a callback with an error or details of the message that was sent
    client.send(
        {
            text: mensagem,
            from: email,
            to: destinatarios,
            subject: assunto,
        },
        (err, message) => {
            if (err) {
            if (err.message.includes('Username and Password not accepted')) {
                console.log('Erro: Usuário ou senha errados')
                // res.send('Erro: Usuário ou senha errados1')
            } else {
                console.log(err.message)
            }
        } else {
            console.log('Email enviado com sucesso!')
            // res.send('Email enviado com sucesso!1')
        }
        }
    );
    return console.log('Ok')
}