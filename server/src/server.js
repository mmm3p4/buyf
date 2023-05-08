const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("../model/model");
const auth = require('../routes/auth.routes');
const path = require("path");
const fileUploads = require("express-fileupload");
const MailService = require("./service/mail/mailer.service")

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", auth);

//Таблица товары//
app.get('/product/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await db.product.findByPk(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json(product);
});
app.get('/products', async (req, res) => {
  try {
    const products = await db.product.findAll({ order: [['id', 'ASC']] });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.get("/products/:catId", async (req, res) => {

  const category = req.params.catId;
  try {
    let products;
    if (category === '7') {
      products = await db.product.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        where: { catid: category },
        order: [['id', 'ASC']]
      });
    } else {
      products = await db.product.findAll({
        attributes: {
          exclude: ['lastprice', 'createdAt', 'updatedAt']
        },
        where: { catid: category },
        order: [['id', 'ASC']]
      });
    }
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


app.post('/product', async (req, res) => {
  const { name, price, amount } = req.body;

  try {
    const existingProduct = await db.product.findOne({ where: { name } });

    if (existingProduct) {
      return res.status(409).send('Товар уже существует');
    }

    const newProduct = await db.product.create({ name, price, amount });

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Ошибка сервера');
  }
});


app.post(
  "/photo/create",
  fileUploads({ tempFileDir: true }),
  (req, res) => {
    console.log(req)
    if (!req.files.photo) {
      res.send({ success: false });
      return;
    }

    const Id = "kkkk00" + ".jpg";


    const Path = path.join(
      __dirname,
      "..",
      "/img",
      Id
    );
    req.files.photo.mv(Path);
    console.log(path)

    const type = req.files.photo.mimetype;


    db.photo.create({ path: Path, type });



    res.send({ success: true, Id })
  }

);

app.get("/photo/:photoId", async (req, res) => {
  const id = +req.params.photoId || 0;
  console.log("photoId", id)
  const photo = await db.photo.findByPk(id)
  console.log(photo)
  if (!photo) {
    res.sendStatus(404);
    return;

  }
  res.setHeader("Content-Type", photo.type)
  res.sendFile(photo.path);
})
app.get("/admin/users", async (req, res) => {
  try {
    const usersList = await db.user.findAll();
    console.log('j')
    res.json(usersList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
})

const PORT = process.env.PORT || 8081;
db.sequelize.sync({ alter: true });

app.post("/activation", async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send('Пользователь не найден')
    }
    const compareCode = () => {
      if (user.activation_code === req.body.activation_code) {
        return true
      }
      else {
        return false
      }
    }
    if (compareCode()) {
      db.user.update({ activated: true }, { where: { email: req.body.email } })
      res.send(true)
    } else {
      throw new Error()
    }
  } catch (error) {
    return res.status(500).send({message: "Неверный код"});
  }
})
app.post("/api/user/:username/activate/:activationCode", async (req,res) => {
  try {
    const user = await db.user.findOne({ where: { username: req.params.username } });
    if (!user) {
        return res.status(404).send('Пользователь не найден')
      }
      const compareCode = () => {
        if (user.activation_code === req.params.activationCode) {
          return true
        }
        else {
          return false
        }
      }
      if (compareCode()) {
        db.user.update({ activated: true }, { where: { username: req.params.username } })
        res.send(true)
      } else {
        throw new Error()
      }
    } catch (error) {
      return res.status(500).send('Ошибка сервера');
    }
  })
// MailService.sendTestMail('frantsova.s01@gmail.com')



// app.post("/order", async (req,res) => {
//   try {
//     // создаем заказ
//     const userId = req.body.userId
//     const productIds = req.body.productIds
//     const order = await db.order.create( userId );

//     // находим все продукты по id и связываем их с заказом
//     const orderProducts = productIds.map(productId => ({
//       productId,
//       orderId: order.id
//     }));
//     await db.orderproducts.bulkCreate(orderProducts);

//     // высчитываем цену заказа и обновляем ее в заказе
//     const totalPrice = await db.orderproducts.sum('price', { where: { orderId: order.id } });
//     await order.update({ price: totalPrice });

//     return order;
//   } catch (error) {
//     console.error(error);
//   }
// })



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

