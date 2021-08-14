Run npm install to get access to Sequelize and Postgres, then run these commands from the root directory

node database/db-build.js
node database/db-fill.js

Some of the related data is bad so it is important to use the intermediary table to get all the data into the database, then pass only the data you need into "Relateds"