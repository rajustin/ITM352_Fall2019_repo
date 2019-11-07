var express = require('express'); // calls for the code to look for the express file
var app = express(); // makes express into app
var myParser = require("body-parser");

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); 
    next();
});

app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
   let POST = request.body;
   response.send(POST); 
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));