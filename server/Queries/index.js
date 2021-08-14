const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atelier',
  password: 'password',
  port: 5432
});

console.log(`Connected to the database`)

module.exports = {
  Products: {
    getOne: (req, res) => {
      let id = req.params.product_id;
      // pool.query(`SELECT * FROM "Products" WHERE id = $1`, [id])
      pool.query(`SELECT "Products".id, "Products".name, "Products".slogan, "Products".description, "Products".category, "Products".default_price, ARRAY_AGG(JSON_BUILD_OBJECT('feature', "Features".feature, 'value', "Features".value)) AS features FROM "Products" INNER JOIN "Features" ON "Products".id = $1 AND "Products".id = product_id GROUP BY "Products".id;`, [id])
      .then(products => res.status(200).send(products.rows[0]))
      .catch(err => {console.log(err); res.status(500).end()})
      // pool.query(`SELECT ARRAY_AGG(JSON_BUILD_OBJECT('feature', Feature, 'value', value)) AS features FROM "Features" WHERE product_id = $1`, [id])
      // .then(product => res.status(200).send(product.rows))
      // .then(product => {
      //   pool.query(`SELECT ARRAY_AGG(JSON_BUILD_OBJECT('feature', Feature, 'value', value)) AS features FROM "Features" WHERE product_id = $1`, [id])
      //   .then(features => {product = product.rows[0]; product.features = features.rows[0].features; console.log(product); console.log(product.features); res.status(200).send(product)})
      //   .catch(err => {console.log(err); res.status(500).end()})
      // })
      // .catch(err => {console.log(err); res.status(500).end()})
    },
    getPage: (req, res) => {
      let count = req.query.count || 5;
      let page = req.query.page || 1;
      pool.query(`SELECT * FROM "Products" OFFSET $1 ROWS FETCH FIRST $2 ROWS ONLY;`, [(page - 1) * count, count])
      .then(products => res.status(200).send(products.rows))
      .catch(err => {console.log(err); res.status(500).end()})
    }
  },
  Styles: {
    getOne: (req, res) => {
      let id = req.params.product_id;
      pool.query(`SELECT  "Styles".id AS style_id, "Styles".name, "Styles".original_price, "Styles".sale_price, "Styles".default_style AS "default?",
      ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('thumbnail_url', "Photos".thumbnail_url, 'url', "Photos".url)) AS photos,
      ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT("SKUs".id, JSONB_BUILD_OBJECT('quantity', "SKUs".quantity, 'size', "SKUs".size))) AS skus
      FROM "Styles"
      INNER JOIN "Photos" ON "Styles".id = "Photos"."styleId"
      INNER JOIN "SKUs" ON "Styles".id = "SKUs"."styleId"
      WHERE "Styles"."productId" = $1 GROUP BY "Styles".id;`, [id])
      // pool.query(`SELECT "Styles".id AS style_id, "Styles".name, "Styles".original_price, "Styles".sale_price, "Styles".default_style AS "default?", ARRAY_AGG(JSON_BUILD_OBJECT('thumbnail_url', "Photos".thumbnail_url, 'url', "Photos".url)) AS photos FROM "Styles" LEFT JOIN "Photos" ON "Photos"."styleId" = "Styles".id WHERE "Styles"."productId" = $1 GROUP BY "Styles".id;`, [id])
      .then(styles => res.status(200).send({product_id: id, results: styles.rows}))
      .catch(err => {console.log(err); res.status(500).end()})
    }
  },
  Related: {
    getAll: (req, res) => {
      let id = req.params.product_id;
      pool.query(`SELECT ARRAY_AGG(related_product_id) FROM "Relateds" WHERE current_product_id = $1;`, [id])
      .then((related) => {res.status(200).send(related.rows[0].array_agg)})
      .catch(err => {console.log(err); res.status(500).end()})
    }
  }
}

// GROUP BY
// aggregate function array_agg
// json_build_object