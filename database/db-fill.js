const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atelier',
  password: 'password',
  port: 5432
});

pool.query(`COPY \"Products\" FROM '/home/joshmbarnes/hackreactor/work/project-atelier/Products/raw_data/product.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
  console.log(err, res);
  pool.query(`COPY \"Styles\" FROM '/home/joshmbarnes/hackreactor/work/project-atelier/Products/raw_data/styles.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
    console.log(err, res);
    pool.query(`COPY \"SKUs\" FROM '/home/joshmbarnes/hackreactor/work/project-atelier/Products/raw_data/skus.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
      console.log(err, res);
      pool.query(`COPY \"Photos\" FROM '/home/joshmbarnes/hackreactor/work/project-atelier/Products/raw_data/photos.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
        console.log(err, res);
        pool.query(`COPY \"Features\" FROM '/home/joshmbarnes/hackreactor/work/project-atelier/Products/raw_data/features.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
          console.log(err, res);
          pool.query(`COPY \"Intermediaries\" FROM '/home/joshmbarnes/hackreactor/work/project-atelier/Products/raw_data/related.csv' DELIMITER ',' CSV HEADER;`, (err, res) => {
            console.log(err, res);
            pool.query(`INSERT INTO \"Relateds\" SELECT * FROM \"Intermediaries\" WHERE related_product_id != 0`, (err, res) => {
              console.log(err, res);
              pool.end();
            });
          });
        });
      });
    });
  });
});




