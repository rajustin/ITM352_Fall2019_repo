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

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    the_username = request.body.username;
    //asking the object if the username exist that the user input in the form
    if(typeof users_reg_data[the_username] != 'undefined');{
        //request.body.password is asking for what the user input and the first half is searhing through the json file
        if (users_reg_data[the_username].password == request.body.password){
            response.send(username + 'logged in!');
        } else {
            response.redirect('/login');
        }
        

    }
});

app.listen(8080, () => console.log(`listening on port 8080`));