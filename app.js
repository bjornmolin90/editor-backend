const docModel = require("./models/model")
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1337;

const visual = false;
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema
} = require("graphql");
const RootQueryType = require("./graphql/root.js");
const schema = new GraphQLSchema({
    query: RootQueryType
});


const index = require('./routes/index');
const docs = require('./routes/docs');
const users = require('./routes/users');

app.use(cors());

const httpServer = require("http").createServer(app);


// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Add a route

app.use('/', index);
app.use('/docs', docs);
app.use('/user', users);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: visual,
}));

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT"]
    }
  });

io.sockets.on('connection', function(socket) {
    
    socket.on('create', function(room) {
        socket.rooms.forEach((item) => {
            if (item !== room && item !== socket.id) {
                socket.leave(item)
            }
        }
        );
        socket.join(room);
    });
    
    socket.on('input', async function(data) {
        socket.to(data._id).emit("ack", data);
        let test = await docModel.updateDoc(data)
    });

});


// Start up server
const server = httpServer.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server;
