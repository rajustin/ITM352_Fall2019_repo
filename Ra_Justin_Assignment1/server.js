//borrowed from Lab13 info_server_EX3.js
var express = require('express'); // calls for the code to look for the express file
var app = express(); // makes express into app
var myParser = require("body-parser");

//calls for express to take request and gives action
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path); 
    next();
});

//shows what you typed out in the form through another page
app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
   let POST = request.body;
   if (typeof POST['quantity_textbox'] != 'undefined'){
    displayPurchase(POST, response);
} 
});

//looks for the static directory and listens on port 8080
app.use(express.static('./static'));
app.listen(8080, () => console.log(`listening on port 8080`));

//copied from lab 13 orer form 2


//function to make sure the string entered in the text box is an integer
function NotNegativeNumber(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number'); // Check if string is a number value
    if(q < 0) errors.push(' Negative value'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push(' Not an integer'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0); 
}

//the function to display the amount purchased
function displayPurchase(POST, response){
    q = POST['quantity_textbox'];
    if(NotNegativeNumber(q)) {
        response.send(`Thank you for purchasing ${q} things!`);
     } else {
     response.send(`${q} is not a quantity! Press the back button and try again.`);
    }
}


