var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
var querystring = require('querystring');

app.use(myParser.urlencoded({ extended: true }));
var filename = 'user_data.json';

if (fs.existsSync(filename)) {
    stats = fs.statSync(filename);

    console.log(filename + ' has ' + stats.size + ' characters');

    data = fs.readFileSync(filename, 'utf-8');

    users_reg_data = JSON.parse(data);

} else {
    console.log(filename + ' does not exist!');
}


app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
    <body>
    <style>
html{
    text-align: center;
    background-image:url("images/Tetris_Background.jpg"); /*Background Image*/
    
}

body{
    height:50%;
    display:table; 
    width:50%;
}



#login{
  
 
    vertical-align:middle;
    background-color: beige;	
    
	
}


</style>

<div id= login>
    <h1>Tetris Login</h1> 
    <p>To play you must be a member<br> Login or Register as Player 1</p> <!--Login for player 1-->
    <form name="login for player 1" method="POST">
    
        <input type="text" name="username" id="username" size="40" placeholder="Enter Username" required><br />
        <input type="password" name="password" size="40" placeholder="Enter Password" onkeyup="" required><br />
        <input type="submit" value="Login" name="login"><br />
    
</form>
       
    </form>
    
    
    <h2>Register Here!</h2> <!--If not login information user will go to registration page-->  
    <input type="button" name="newuser" value="New User" 
        onclick="window.location='register.html' + document.location.search;">

   <h2>Play as a Guest Without Login!</h2> <!--Allows user to go straight to the game without login-->
    <input type="button" name="Guest" value="Play as Guest"
    onclick="window.location='playbutton.html' + document.location.search;">
  </div>
</body>

    `;
    response.send(str);
});

app.post("/logUserin", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(request.body);
    //Diagnostic
    the_username = request.body.username;
    if (typeof users_reg_data[the_username] != 'undefined') {
      //Asking object if it has matching username, if it doesnt itll be undefined.
      if (users_reg_data[the_username].password == request.body.password) {
        response.redirect('playbutton.html');
        //Redirect them to play button here if they logged in correctly
      } else {
        response.redirect('server.js');
      }
     
    }
  });



  app.post("/registerMember", function (req, res) { 
    qstr = req.body
    console.log(qstr);
  
    
    var errors = []; //assume no errors at first,
  
    //name contains only letters 
    if (/^[A-Za-z]+$/.test(req.body.name)) {
    }
    else {
      errors.push('Invalid character, only use letters for name!')
    }
    
    // length of full name is between 0 and 25 
    if ((req.body.name.length > 25 && req.body.name.length <0)) {
      errors.push('Full Name Too Long')
    }
    
    
    
    //checks to see if username already exists
  
    var reguser = req.body.username.toLowerCase(); 
    if (typeof users_reg_data[reguser] != 'undefined') { 
      errors.push('Username taken')
    }
    //validating username 
    //Check letters and numbers only
    
    if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
    }
    else {
      errors.push('Please only use letters and numbers for username')
    }
    if ((req.body.username.length < 5 && req.body.username.length > 20)) {
      errors.push('username must be between 5 and 20 characters')
    }
  //validating password 
    //password is min 6 characters long 
    if ((req.body.password.length < 5)) {
      errors.push('Password must be longer than 5 characters')
    }
    // check to see if passwords match
    if (req.body.password !== req.body.passConfirm) { 
      errors.push('Passwords do not match!')
    }
  
    
  
  
    // if there are no errors, save the json data and send user to the invoice
  
    if (errors.length == 0) {
      console.log('none!');
      req.query.username = reguser;
      req.query.name = req.body.name;
      res.redirect('./playbutton.html?' + querystring.stringify(req.query))

      user_data_JSON = fs.readFileSync(filename, 'utf-8');
      user_data = JSON.parse(user_data_JSON);
      fs.writeFileSync(filename, JSON.stringify(users_reg_data));
    }
    if (errors.length > 0) {
      console.log(errors)
      req.query.name = req.body.name;
      req.query.username = req.body.username;
      req.query.password = req.body.password;
      req.query.confirmpsw = req.body.confirmpsw;
      req.query.email = req.body.email;
  
      req.query.errors = errors.join(';');
      res.redirect('./register.html?' + querystring.stringify(req.query)) //trying to add query from registration page and invoice back to register page on reload
    }
  
    //add errors to querystring
  
  }
  );
  

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));