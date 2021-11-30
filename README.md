# Connecting to SSH instace
to connect
  ssh -i file.pem ubuntu@ip.address
run the following commands on the AWS instance to update it
  sudo apt-get update && sudo apt-get upgrade -y

# Install and Set Up

First, you'll have to install postgres on the device
  sudo apt install postgresql
Update the postgres user to have the password 'password'
Start the postgres server, then create the atelier database using the following command:
  CREATE DATABASE atelier;

Then get node with
  curl -sL hhtps://deb.nodesource.com/setup_14.x | sudo -E bash -
Run npm install to get access to all the necessary node_modules, then run the following scripts in order:
  npm run build
  <!-- npm run fill -->
<!-- Let both scripts finish running or else the tables will not be ready to accept the data -->
CANNOT USE THE FILL SCRIPT, ADDING THE CVS DATA THE INSTANCE IS TOO MEMORY INTENSIVE

Note: Some of the related data is bad so it is important to use the intermediary table to get all the data into the database, then pass only the data you need into the relateds table.

After the database has been built and filled with data, run the following script:
  npm start

Congratulations. The database is filled and the server is up and operational!

# Rerouting
Don't forget to update the iptables!


# Testing
Note: axios is installed for the purposes of unit testing with jest

To make sure the database and server are both operational, make sure the server is not running and run the following command:
  npm run test
This will run a very brief series of unit tests to make sure everything install correctly.

To test the server's capabilities locally, make sure the server is running and run one of the following commands:
  npm run light-hit

These are scripts to run different levels of Artillery.io tests, ramping up in difficulty.

# Ongoing Service
To run the service even when disconnected from the shell, use npm run pm2-start script
To stop it, run npm run pm2-stop


# Project-Atelier (Products)

This is the products service for Project-Atelier, the back-end of an e-commerce website. 

## Description

An in-depth paragraph about your project and overview of use.
This service is designed to serve as the back-end for an e-commerce website's product database. The information sent by the service is structured as such as to be sent to the front-end the same way it has been historically. This particular service handles information received largely by the Products and Related Products portion of the front-end, though information is pulled from this service by other parts of the front-end as well. As requested by the client, this service can handle up to 100 requests per second with a response time of under 20 ms, though it can handle up to 1000 per second without issue. This service was designed in part with an additional two services, but is able to be used and modified independt of them.

## Getting Started

### Dependencies

* This project requires node or something similar to handle the package.json install.
* PostgreSQL is required as a database.
* You will also need the AWS key if intended to access the deployed product.

### Installing

* This service has previously been deployed for testing and demoing, but is currently offline.
* After cloning down to your local repo, you will need to create a copy of the conflig.example.js file and name it config.js. Replace the username and password templates with the username and password of your PostgreSQL user that will be accessing the database.
* You will also need access to the client's data if starting clean, otherwise the data is already in the database.

### Executing program

* Once you have configured your files, if you need to build the database, use the following script: `npm run build`.
* If you need to fill the database with clean data, run this script: `npm run fill`.
* To start the server, use: `npm start`.
* If starting the deployed server, use: `npm run pm2 start`. This will run the server without requiring a terminal to manage it. You can sign out of the deployed instance without shutting off the server in this way. To stop it, run: `npm run pm2 stop`.
* To test the program locally, or to make sure it is operating correctly, you can use: `npm run test` or `npm run light-hit` for jest or artillery respectively.

## Help

Axios has been installed for testing purposes. It has no function inside the service itself.

## Author (for this service)

Joshua Barnes
  * [Joshua-Barnes03] (https://github.com/Joshua-Barnes03)

## Version History

* 0.1
    * Initial Release

## License

This project exists under no licenses.

## Acknowledgments

ReadME created using template:
* [ReadME-template] (https://gist.github.com/DomPizzie/7a5ff55ffa9081f2de27c315f5018afc)
