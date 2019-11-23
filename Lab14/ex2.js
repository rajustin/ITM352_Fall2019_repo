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

