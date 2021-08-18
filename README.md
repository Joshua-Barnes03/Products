# Install and Set Up

First, you'll have to install postgres on the device
Update the postgres user to have the password 'password'
Start the postgres server, then create the atelier database using the following command:
  CREATE DATABASE atelier;

Run npm install to get access to all the necessary node_modules, then run the following scripts in order:
  npm run build
  npm run fill
Let both scripts finish running or else the tables will not be ready to accept the data

Note: Some of the related data is bad so it is important to use the intermediary table to get all the data into the database, then pass only the data you need into the relateds table.

After the database has been built and filled with data, run the following script:
  npm start

Congratulations. The database is filled and the server is up and operational!

# Testing
Note: axios is installed for the purposes of unit testing with jest

To make sure the database and server are both operational, make sure the server is not running and run the following command:
  npm run test
This will run a very brief series of unit tests to make sure everything install correctly.

To test the server's capabilities locally, make sure the server is running and run one of the following commands:
  npm run light-hit

These are scripts to run different levels of Artillery.io tests, ramping up in difficulty.