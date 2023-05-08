const crypto = require('crypto');
const MailService = require('../src/service/mail/mailer.service');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        activated: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        activation_code: {
            type: Sequelize.STRING,
            defaultValue: () => crypto.randomBytes(5).toString('hex').slice(0, 6)
        }
    });
        User.addHook('beforeCreate', async (user) => {
            const activationCode = user.activation_code;
            MailService.sendActivationCode(user.email, activationCode);
        });
    return User;
};    
