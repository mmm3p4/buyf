module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        loginTime: {
            type: Sequelize.DATE,
            allowNull: false
          },
          logoutTime: {
            type: Sequelize.DATE
          }
    });
    return Session;
};    