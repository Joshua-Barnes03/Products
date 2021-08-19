const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '18.222.196.58',
  database: 'atelier',
  password: 'password',
  port: 5432
});

console.log(`Connected to the database`)

module.exports = {
  Products: {
    getOne: (req, res) => {
      let id = req.params.product_id;
      // pool.query(`SELECT * FROM products WHERE id = $1`, [id])
      pool.query(`SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price, ARRAY_AGG(JSON_BUILD_OBJECT('feature', features.feature, 'value', features.value)) AS features FROM products INNER JOIN features ON products.id = $1 AND products.id = product_id GROUP BY products.id;`, [id])
      .then(products => res.status(200).send(products.rows[0]))
      .catch(err => {console.log(err); res.status(500).end()})
      // pool.query(`SELECT ARRAY_AGG(JSON_BUILD_OBJECT('feature', Feature, 'value', value)) AS features FROM features WHERE product_id = $1`, [id])
      // .then(product => res.status(200).send(product.rows))
      // .then(product => {
      //   pool.query(`SELECT ARRAY_AGG(JSON_BUILD_OBJECT('feature', Feature, 'value', value)) AS features FROM features WHERE product_id = $1`, [id])
      //   .then(features => {product = product.rows[0]; product.features = features.rows[0].features; console.log(product); console.log(product.features); res.status(200).send(product)})
      //   .catch(err => {console.log(err); res.status(500).end()})
      // })
      // .catch(err => {console.log(err); res.status(500).end()})
    },
    getPage: (req, res) => {
      let count = req.query.count || 5;
      let page = req.query.page || 1;
      pool.query(`SELECT * FROM products OFFSET $1 ROWS FETCH FIRST $2 ROWS ONLY;`, [(page - 1) * count, count])
      .then(products => res.status(200).send(products.rows))
      .catch(err => {console.log(err); res.status(500).end()})
    }
  },
  Styles: {
    getOne: (req, res) => {
      let id = req.params.product_id;
      pool.query(`SELECT  styles.id AS style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS "default?",
      ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos,
      JSONB_OBJECT_AGG(DISTINCT skus.id, JSONB_BUILD_OBJECT('quantity', skus.quantity, 'size', skus.size)) AS skus
      FROM styles
      INNER JOIN photos ON styles.id = photos."styleId"
      INNER JOIN skus ON styles.id = skus."styleId"
      WHERE styles."productId" = $1 GROUP BY styles.id;`, [id])
      // pool.query(`SELECT styles.id AS style_id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS "default?", ARRAY_AGG(JSON_BUILD_OBJECT('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos FROM styles LEFT JOIN photos ON photos."styleId" = styles.id WHERE styles."productId" = $1 GROUP BY styles.id;`, [id])
      .then(styles => res.status(200).send({product_id: id, results: styles.rows}))
      .catch(err => {console.log(err); res.status(500).end()})
    }
  },
  Related: {
    getAll: (req, res) => {
      let id = req.params.product_id;
      pool.query(`SELECT ARRAY_AGG(DISTINCT related_product_id) FROM relateds WHERE current_product_id = $1;`, [id])
      .then((related) => {res.status(200).send(related.rows[0].array_agg)})
      .catch(err => {console.log(err); res.status(500).end()})
    }
  }
}

// GROUP BY
// aggregate function array_agg
// json_build_object