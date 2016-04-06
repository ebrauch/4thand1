var express = require('express');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var email = require('./email.js');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {user: email.address, pass: email.password}
});

var app = express();

mongoose.connect('mongodb://localhost/nfl');

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res){
    res.render('index', {title: '4th and 1'});
});

var playersCtrl = require('./controllers/playersCtrl.js');

app.get('/api/totals', playersCtrl.getTotals);
app.get('/api/:player', playersCtrl.addPlayer);
app.get('/contact/:name/:email/:message', function(req, res) {
    var mailOptions = {
        to: email.to,
        subject: 'Contact form submission, reply to: ' + req.params.email,
        html: '<b>' + req.params.name + '</b>' +  ' wrote: <br>' + req.params.message
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});

var port = 3000;

app.listen(port, function(){
    console.log('server running on port ' + port);
});