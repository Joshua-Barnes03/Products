const models = require('../Models');

module.exports = {
  getStyles: (req, res) => {
    let productId = req.params.product_id;
    models.Styles.getStyles(productId, (err, styles) => {
      if (err) {
        throw err;
      } else {
        const newStyles = styles.map((style) => {
          return models.SKUS.getSKUS(style.id);
        })
        // console.log(newStyles)
        Promise.all(newStyles).then((result) => {
          console.log('sending response')
          res.send(result);
        })
      }
    })
  }
}