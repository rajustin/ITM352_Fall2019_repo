//put the amount you want to tchange in pennies here
amount = 73;

//get the max number of quarters
quarters = parseInt(amount/25);
leftover = amount%25;

//get the max number of dimes from leftover amount
dimes = parseInt(leftover/10);
leftover = amount%10;

//get the max number nickels from left over
nickels = parseInt(leftover/50);
leftover = amount%5;

//what's left will be 0-4 pennies
pennies = leftover;

console.log('Quarters: ' + quarters + ' Dimes: ' + dimes + ' Nickels: ' + nickels + ' Pennies: ' + pennies);