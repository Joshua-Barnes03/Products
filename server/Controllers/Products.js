const models = require('../Models');

module.exports = {
  getPage: (req, res) => {
    let count = req.query.count;
    let page = req.query.page;
    models.Products.getPage(count, page, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.writeHead(200);
        res.end(JSON.stringify(result));
      }
    })
  },
  getOne: (req, res) => {
    let id = req.params.product_id;
    models.Products.getOne(id, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.writeHead(200);
        res.end(JSON.stringify(result));
      }
    })
  }
}