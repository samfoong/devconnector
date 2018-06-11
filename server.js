const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport'); //main authentication module

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB through mongoose
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Conencted')) //if connect successfully
    .catch(err => console.log(err)); //if there is an error- how javascript promises works

// Passport Middleware
app.use(passport.initialize());


// Passport Config 
require('./config/passport')(passport);


//app.get('/', (req, res) =>res.send('Hello!'));  // initial Hello World

// Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));