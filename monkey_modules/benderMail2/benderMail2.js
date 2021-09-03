const nodemailer = require("nodemailer");
let erro, mensagem
exports.send = async function (senhaAtendente) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'bender.ferimport@gmail.com', // generated ethereal user
            pass: senhaAtendente, // generated ethereal password
        },
    });
    transporter.sendMail({
        from: '"Bender" <bender.ferimport@gmail.com>',
        to: "humberto.axl@ferimport.com.br",
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>", // html body
    }, (err, message) => {
        if (err) {
            erro = err;
        }
    });
    // if (erro) {
        // switch (erro) {
            // case 2: return 'Email ou senha incorretos!'
            // default: return erro
        // }
        console.log(erro)
    // } else {
    //     return 'Email enviado com sucesso!'
    // }
}
