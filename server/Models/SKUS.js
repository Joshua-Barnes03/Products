const db = require('../db');

module.exports = {
  getSKUS: (styleId) => {
    return db.SKUS.findAll({
      where: {
        styleId
      }
    }).then((success) => {
      return success
    }).catch((err) => {
      throw err;
    })
  }
}