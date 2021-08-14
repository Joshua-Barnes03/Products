const db = require('../db');

module.exports = {
  getStyles: (productId, callback) => {
    db.Styles.findAll({
      where: {
        productId
      }
    }).then((success) => {
      return callback(null, success);
    }).catch((err) => {
      return callback(err);
    })
  }
}