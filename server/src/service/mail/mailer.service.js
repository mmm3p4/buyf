const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: '465',
    secure: true,
    auth: {
        user: 'mmm3p4',
        pass: 'iwbjqeaeqgvajabh',
    }
}, {
    from: 'BUYF <mmm3p4@yandex.ru>'
})
sendTestMail = (email) => {
    transporter.sendMail({
        to: email,
        subject: 'BUYF',
        text: 'Hello world',
        html: `<h1>Рассылка интернет-магазина цветов BUYF</h1>
    <i>Здравствуйте, ${email}</i>
    <p>Вы успешно подписались на нашу рассылку!</p>`
    })
        .then(() => console.info("Письмо успешно отправлено на адрес: ", email))
        .catch(err => console.warn("Произошла ошибка при отправке сообщения: ",
            err))
}
sendActivationCode = (email, activationCode) => {
    transporter.sendMail({
        to: email,
        subject: 'BUYF - код активации',
        text: 'Код активации для регистрации в BUYF: ${ activationCode }',
        html: `<h1>BUYF - код активации</h1> <p>Код активации для регистрации в BUYF: <strong>${activationCode}</strong></p>`
        })
        .then(() => console.info("Письмо с кодом активации отправлено на адрес: ", email))
        .catch(err => console.warn("Произошла ошибка при отправке сообщения: ", err))
        };
const MailService = {
    sendTestMail: sendTestMail,
    sendActivationCode: sendActivationCode
}
module.exports = MailService;
