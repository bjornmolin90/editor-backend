This app contains the backend of a text editor with mongo db as database.
Packages needed to run it are:
cors, dotenv, express, mongodb, morgan

To install them run:
npm install express cors morgan --save
npm install
npm install mongodb --save
npm install --save dotenv

Import the packages and start the app with npm start.

The only route being used is /docs which handles both get, put and post -requests.