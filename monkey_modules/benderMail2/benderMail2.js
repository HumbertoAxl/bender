const nodemailer = require("nodemailer");
exports.send = async function (senhaAtendente) {
    let status = 200
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'bender.ferimport@gmail.com', // generated ethereal user
            pass: senhaAtendente, // generated ethereal password
        },
    });
    try {
        await transporter.sendMail({
            from: '"Bender" <bender.ferimport@gmail.com>',
            to: "humberto.axl@ferimport.com.br",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>", // html body
        });
    } catch (e) {
        status = e.responseCode
    }
    return status
}