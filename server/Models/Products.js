const db = require('../db');

module.exports = {
  getPage: (count, page, callback) => {
    return callback(null, success)
  },
  getOne: (id, callback) => {
    db.Products.findAll({
      where: {
        id
      }
    }).then((success) => {
      return callback(null, success);
    }).catch((err) => {
      return callback(err);
    })
  }
}