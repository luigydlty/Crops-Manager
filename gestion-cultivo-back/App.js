const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

mongoose.connect('mongodb+srv://admin:1234@gestion-cultivo.n72pr.mongodb.net/gestion-cultivo?retryWrites=true&w=majority');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to database");
    });

app.set('port', process.env.PORT || 8081);
app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
}); 
app.use('/users', require('./routes/users'));
app.use('/crops', require('./routes/crops'));
app.use('/propertys', require('./routes/propertys'));
app.use('/parameters', require('./routes/parameters'));
app.use('/configs', require('./routes/configs')); 
