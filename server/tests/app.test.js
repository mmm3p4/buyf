// const { calculatePower } = require("./test1");
// test('sum test', () => {
//  expect(2+5).toBe(7)
// });
// test('test calculate power', () => {
//  expect(calculatePower(5,2)).toBe(25);
// });
const request = require('supertest');
const app = require('../src/server'); // Предположим, что ваше приложение находится в файле app.js
const db = require('../config/db.config'); // Предположим, что ваш модуль Sequelize находится в файле db.js


describe('GET /products', () => {
  it('should return products in ascending order by id', async () => {
    const mockProducts = [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' },
      { id: 3, name: 'Product 3' }
    ];

    // Мокаем функцию из модуля Sequelize
    await db.product.findAll() = jest.fn().mockResolvedValue(mockProducts);

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
    expect(db.product.findAll).toHaveBeenCalledTimes(1);
    expect(db.product.findAll).toHaveBeenCalledWith({ order: [['id', 'ASC']] });
  });

  it('should return 500 and error message on server error', async () => {
    const mockError = new Error('Some error message');

    db.product.findAll = jest.fn().mockRejectedValue(mockError);

    const response = await request(app).get('/products');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Server Error');
    expect(db.product.findAll).toHaveBeenCalledTimes(1);
    expect(db.product.findAll).toHaveBeenCalledWith({ order: [['id', 'ASC']] });
  });
});


