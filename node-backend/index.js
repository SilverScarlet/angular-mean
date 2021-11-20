let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db');
    app = express();


mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    // useNewURLParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,

}).then(() => {
    console.log('Database Successfully connected');
}, err => {
    console.log('Database error: ', err);
})

const bookRoute = require('./routes/book.route');



app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// Static Directory path
app.use(express.static(path.join(__dirname + '/dist/')))

//Base route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'))

})

// API ROUTE
app.use('/api', bookRoute);

// PORT

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('This Server Listening at PORT : ' + port);

})



// 404 Handler
app.use((req, res, next) => {
    next(createError(404));
})

// error handler
app.use((err, req, res, next) => {
    console.error("Error :",err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})

