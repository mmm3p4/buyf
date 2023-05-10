const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("../model/model");
const auth = require('../routes/auth.routes');
const path = require("path");
const fileUploads = require("express-fileupload");
const MailService = require("./service/mail/mailer.service")
var bcrypt = require("bcryptjs");

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
app.get('/isproduct/:id', async (req, res) => {
  try {
  const productId = req.params.id;
  const product = await db.product.findByPk(productId);

  if (!product) {
    res.status(404).json({message: false});
  }
  else {res.status(200).json({message: true})}
} catch (err) {
  console.error(err.message);}
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
  const { name, price, amount, catid,photoId, lastprice, description } = req.body;

  try {
    const existingProduct = await db.product.findOne({ where: { name } });

    if (existingProduct) {
      return res.status(409).send('Товар уже существует');
    }

    const newProduct = await db.product.create({ name, price, amount, catid,photoId, lastprice, description });

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

app.put("/newpass", async (req, res) => {
    try {
      const user = await db.user.findOne({ where: { username: req.body.username } });
      const naturalpass = await bcrypt.compare(req.body.password, user.password)
      if (!user) {
        return res.status(404).send('Пользователь не найден')
      }
      if (req.body.newpassword === req.body.password) {
        return res.status(500).send({message: "Текущий пароль и новый пароль совпадают"});
      }
      const comparePass =  () => {
        if (!naturalpass) {
          return false
        }
        else {
            return true
          }
      }  
      if (comparePass()) { 
        const hashpass = await bcrypt.hash(req.body.newpassword, 8)
        db.user.update({ password: hashpass }, { where: { username: req.body.username } })
        res.status(200).json({message: "Пароль изменен"})
      } else { 
        throw new Error()
      }
    }
      catch (error) {
        return res.status(500).send({message: "Текущий пароль неверный"});
      }
      
})

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
      res.status(200).json({message: "Аккаунт активирован"})
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

app.post("/subscribing", async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send('Пользователь не найден')
    }
    const compareSubsc = () => {
      if (req.body.subscribed) {
        MailService.sendTestMail(req.body.email)
        return true
      }
      else {
        return false
      }
    }
    if (compareSubsc()) {
      db.user.update({ subscribed: true }, { where: { email: req.body.email } })
      res.status(200).json({message: "Аккаунтподписан на рассылку"})
    } else {
      throw new Error()
    }
  } catch (error) {
    return res.status(500).send({message: "Ошибка"});
  }
})

app.get("/issubscribing/:email", async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.params.email } });
    if (!user) {
      return res.status(404).send('Пользователь не найден')
    }
    if (user.subscribed) {
        return res.status(200).json({message:'подписка есть'})
    }
    else {
        console.log("юзер не подписан")
        return res.status(305).json({message:'подписка нет'})
      }
    }

    catch (error) {
    return res.status(500).send({message: "Ошибка"});
  }
})

app.post("/order", async (req, res) => {
  try {
    const userId = req.body.userId;
    const productIds = req.body.productIds;

    // Находим все продукты по id и связываем их с заказом
    const orderProducts = await Promise.all(productIds.map(async (productId) => {
      const product = await db.product.findOne({ where: { id: productId } });
      if (!product) {
        throw new Error(`Продукт с id ${productId} не найден`);
      }
      return {
        productId,
        quantity: 1, // предполагаем, что количество товара в заказе всегда равно 1
        price: product.price, // записываем цену товара в заказ
      };
    }));
    
    // Создаем заказ и привязываем к нему продукты
    const order = await db.order.create({ userId, orderproducts: orderProducts }, { include: db.orderproducts });

    // Высчитываем цену заказа и обновляем ее в заказе
    const totalPrice = orderProducts.reduce((acc, product) => acc + product.price, 0);
    await order.update({ price: totalPrice });

    return res.send(order);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Ошибка создания заказа" });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

