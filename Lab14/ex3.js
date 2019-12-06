var express = require('express');
var app = express();
var myParser = require("body-parser");


app.use(myParser.urlencoded({ extended: true }));


//requires file sync
fs = require('fs');
//brining out the user_data.json file to refer back
var filename = 'user_data.json';

//check the file to see if the data exist and parse it and bring it out. 
//if it doesn't exist we will 
if(fs.existsSync(filename)) {
    stats = fs.statSync(filename);
    console.log(filename + ' has ' + stats.size + ' charecters');

data = fs.readFileSync(filename, 'utf-8');

    users_reg_data = JSON.parse(data);

    console.log(users_reg_data.itm352.password);
} else{
    console.log(filename + 'doesn not exist!');

}

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });
 var express = require('express');
 var app = express();
 var myParser = require("body-parser");
 var fs = require('fs');
 var filename = 'user_data.json';
 
 app.use(myParser.urlencoded({ extended: true }));
 
 if (fs.existsSync(filename)) {
     data = fs.readFileSync(filename, 'utf-8');
 
     stats = fs.statSync(filename)
     console.log(filename + ' has ' + stats.size + ' characters');
 
     users_reg_data = JSON.parse(data); // Takes a string and converts it into object or array
 
     console.log(users_reg_data.itm352.password);
 } else {
     console.log(filename + ' does not exist!');
 }
 
 // CHANGE to Login HTML
 app.get("/login", function (request, response) {
     // Give a simple login form
     str = `
 <body>
 <form action="" method="POST">
 <input type="text" name="username" size="40" placeholder="enter username" ><br />
 <input type="password" name="password" size="40" placeholder="enter password"><br />
 <input type="submit" value="Submit" id="submit">
 </form>
 </body>
     `;
     response.send(str);
 });
 
 // CHANGE to Login HTML
 app.post("/login", function (request, response) {
     // Process login form POST and redirect to logged in page if ok, back to login page if not
     console.log(request.body);
     // Checks if username exists already USE FOR LOGIN CHECK
     the_username = request.body.username;
     if (typeof users_reg_data[the_username] != 'undefined') {
         if (users_reg_data[the_username].password == request.body.password) {
             response.send(the_username + ' logged in!'); // REDIRECT to Invoice HTML
         } else {
             response.redirect('/login'); //REDIRECT to Login HTML
         }
     }
 });
 
 app.listen(8080, () => console.log(`listening on port 8080`));