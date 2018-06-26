var express = require('express');
var app = express();

var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(express.static('public'));

var multer  =   require('multer');  


//********************************** Middleware use next()   ********************************/

app.use(function(req, res, next) {  
    console.log('%s %s', req.method, req.url);  
    next();  
  });  


//********************************** GET Example ********************************/

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.get('/process_get', function (req, res) {
    response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name
    };
    console.log(response);
    // res.send('<p>Username: ' + req.query['first_name']+'</p><p>Lastname: '+req.query['last_name']+'</p>'); 
    // res.end(JSON.stringify(response));

    res.send('<p>Firstname: ' + req.query['firstname'] + '</p>  <p>Lastname: ' + req.query['lastname'] + '</p><p>Password: ' + req.query['password'] + '</p> <p>AboutYou: ' + req.query['aboutyou'] + '</p>');

})

//********************************** POST Example ********************************/

var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.get('/index_post.html', function (req, res) {
    res.sendFile(__dirname + "/" + "index_post.html");
})

app.post('/process_post', urlencodedParser, function (req, res) {
    // Prepare output in JSON format  
    response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

//********************************** Routing Example ********************************/

app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Welcome to JavaTpoint!');
})
app.post('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('I am Impossible! ');
})
app.delete('/del_student', function (req, res) {
    console.log("Got a DELETE request for /del_student");
    res.send('I am Deleted!');
})
app.get('/enrolled_student', function (req, res) {
    console.log("Got a GET request for /enrolled_student");
    res.send('I am an enrolled student.');
})
// This responds a GET request for abcd, abxcd, ab123cd, and so on  
app.get('/abcd', function (req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Pattern Matched.');
})

//********************************** Cookie Example ********************************/


app.get('/cookieset', function (req, res) {
    res.cookie('cookie_name', 'cookie_value');
    res.cookie('company', 'Awfis');
    res.cookie('name', 'sonoo');

    res.status(200).send('Cookie is set');
});

app.get('/cookieget', function (req, res) {
    res.status(200).send(req.cookies);
});


//********************************** Upload File Example ********************************/

var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './uploads');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  
  var upload = multer({ storage : storage}).single('myfile');  
    
  app.get('/index_upload',function(req,res){  
        res.sendFile(__dirname + "/index_upload.html");  
  });  
    
  app.post('/uploadfile',function(req,res){  
      upload(req,res,function(err) {  
          if(err) {  
              return res.end("Error uploading file.");  
          }  
          res.end("File is uploaded successfully!");  
      });  
  });  


//********************************** Server Setup ********************************/

var server = app.listen(8000, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);



});