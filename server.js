const Sequelize = require('sequelize');
const { STRING, UUID, UUIDV4 } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/the_react_store_db');

const Product = conn.define('product', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false
  }
});



const express = require('express');
const app = express();

app.get('/api/products', async(req, res, next)=> {
  try {
    res.send(await Product.findAll());
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, async()=> {
  try {
    console.log(`listening on port ${port}`);
    await conn.sync({ force: true });
    await Promise.all(
      ['foo', 'bar', 'bazz'].map( name => Product.create({ name }))
    );
    console.log('data is seeded');
  }
  catch(ex){
    console.log(ex);
  }
});
