//Creating a server via express//
var data = require('./public/tetris.js'); //get the data from product_data.js


var express = require('express'); //Server requires express to run//
var app = express(); //Run the express function and start express//
var myParser = require("body-parser");


app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path)
    next();
});

app.use(myParser.urlencoded({ extended: true }));
//to process the response from what is typed in the form
app.get("./public/tetris.js", function (request, response) {
   let GET = request.body;
   if (typeof GET['quantity_textbox'] != 'undefined') {
    displayPurchase(GET, response);
    
} 
});

app.use(express.static('./public')); //Creates a static server using express from the public folder
app.listen(8080, () => console.log(`listen on port 8080`))
