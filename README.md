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
* To make sure the server and database are both working correctly, make sure the server is not running, then use: `npm run test`. This will run a test using Jest to make sure both parts of the service are functioning.
* To make test the services load-bearing functionality, make sure the server is running, then use: `npm run light-hit`. This is a warm-up test using Artillery.io. This just certifies the service is able to handle use. Large scale testing should be saved for the deployed service.

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
