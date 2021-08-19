const express = require('express');
const morgan = require('morgan');
// const controllers = require('./Controllers');
const queries = require('./Queries');

const app = express();

// app.use(morgan('dev'))
app.use(express.json());

app.set('port', 3000);

app.get('/products', queries.Products.getPage);

app.get('/products/:product_id', queries.Products.getOne);

app.get('/products/:product_id/styles', queries.Styles.getOne);

app.get('/products/:product_id/related', queries.Related.getAll)

const {loader} = require('../loader.txt');
app.get('/loaderio-442de13460a798742b2b3529ddd00927.txt', (req, res) => {
  res.send(loader)
});

app.listen(app.get('port'));
console.log('Listening on ', app.get('port'));