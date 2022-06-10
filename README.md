

# Zipee Commerce
This project was generated using [Nx](https://nx.dev).

<br/>

## Quick Start & Documentation
Clone this repo to your local machine, open a terminal window and change to the directory containing the repo, and execute `npm install` in the terminal.

<br/>

### Running the API
To serve the API locally, execute the command `npm run serve-api`. This will serve the API at `http://localhost:3333/api`.

To view endpoints via Postman, connect to the Workspace ID:<br/>
01a72044-eeca-421c-ba12-63763b56d980

or Workspace URL:<br/>
https://www.postman.com/yaatly/workspace/zippe-commerce

<br/>

___
TIP - This application is limited and scope and prior to working with Customer endpoints, a Customer should be created first by making a POST request to: `http://localhost:3333/api/customer`
___

<br/>

### Running the Frontends
This project currently has two apps: one for Customers and one for Admin. However, these apps do not yet have functionality. To be continued.

<br/>

To serve the Customer app, execute the command `npm run serve-app-customer` in a terminal within the project directory. This will serve the customer app at `http://localhost:4200`.

<br/>

To serve the Admin app, execute the command `npm run serve-app-admin` in a terminal within the project directory. This will serve the admin app at `http://localhost:4201`.

<br/>

### Testing
To run all tests, execute the command `npm run test-sequence`, or `npm run test-parallel`.
