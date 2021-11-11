const nodemailer = require("nodemailer");
exports.send = async function (nomeAtendente, emailAtendente, senhaAtendente, nomeCliente, emailCliente, assunto, conteudoEmail) {
    let status = 200
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: emailAtendente, // generated ethereal user
            pass: senhaAtendente, // generated ethereal password
        },
    });
    try {
        await transporter.sendMail({
            from: `"${nomeAtendente}" <${emailAtendente}>`,
            to: `"${nomeCliente}" <${emailCliente}>`,
            subject: assunto,
            text: conteudoEmail
        });
    } catch (e) {
        status = e.responseCode
    }
    return status
}

exports.auth = async function (email, senha) {
    let status
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: email,
            pass: senha,
        },
    });
    await transporter.verify().then(function (value) {
        status = 200
        console.log(value)
    }, function (erro) {
        console.log(erro)
        status = erro.responseCode
    });
    return status
}