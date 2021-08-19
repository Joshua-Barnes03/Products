const express = require('express');
const morgan = require('morgan');
const path = require('path');
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

app.get('/loaderio-442de13460a798742b2b3529ddd00927.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../loaderio-442de13460a798742b2b3529ddd00927.txt'), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Sent: loaderio-442de13460a798742b2b3529ddd00927.txt')
    }
  })
});

app.listen(app.get('port'));
console.log('Listening on ', app.get('port'));