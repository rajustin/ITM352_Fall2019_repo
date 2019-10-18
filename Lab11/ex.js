
attributes  =  "<justin>;<20>;<20.5>;<-19.5>" ;
theSeperator = ';';
parts = attributes.split(theSeperator);



//parts = ['Justin', 20, 20.5, -19.5];

for(i=0; i< parts.length; i++) {
    console.log(typeof parts[i]);
}

console.log(parts.join(theSeparator));

function isNonNegInt(q) {
    console.log('hey!');
}

isNonNegInt();