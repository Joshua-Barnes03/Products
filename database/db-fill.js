const { Pool, Client } = require('pg');
const path = require('path');
const  {dirPath} = require('../raw_data/pathfinder.js');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atelier',
  password: 'password',
  port: 5432
});

pool.query(`COPY products FROM '${path.join(dirPath, 'product.csv')}' DELIMITER ',' CSV HEADER;`, (err, res) => {
  if (err) {console.log('Products:', err)}
  if (res) {console.log('Successfully inserted products')}
  pool.query(`COPY styles FROM '${path.join(dirPath, 'styles.csv')}' DELIMITER ',' CSV HEADER;`, (err, res) => {
    if (err) {console.log('Styles:', err)}
    if (res) {console.log('Successfully inserted styles')}
    pool.query(`COPY skus FROM '${path.join(dirPath, 'skus.csv')}' DELIMITER ',' CSV HEADER;`, (err, res) => {
      if (err) {console.log('skus:', err)}
      if (res) {console.log('Successfully inserted skus')}
      pool.query(`COPY photos FROM '${path.join(dirPath, 'photos.csv')}' DELIMITER ',' CSV HEADER;`, (err, res) => {
        if (err) {console.log('Photos:', err)}
        if (res) {console.log('Successfully inserted photos')}
        pool.query(`COPY features FROM '${path.join(dirPath, 'features.csv')}' DELIMITER ',' CSV HEADER;`, (err, res) => {
          if (err) {console.log('Features:', err)}
          if (res) {console.log('Successfully inserted features')}
          pool.query(`COPY intermediaries FROM '${path.join(dirPath, 'related.csv')}' DELIMITER ',' CSV HEADER;`, (err, res) => {
            if (err) {console.log(err)}
            if (res) {console.log('Successfully inserted intermediaries')}
            pool.query(`INSERT INTO relateds SELECT * FROM intermediaries WHERE related_product_id != 0`, (err, res) => {
              if (err) {console.log('Relateds:', err)}
              if (res) {console.log('Successfully inserted relateds')}
              pool.end();
            });
          });
        });
      });
    });
  });
});




