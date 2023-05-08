module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        price: {
            type: Sequelize.INTEGER
        }
    });
    return Order;
};    