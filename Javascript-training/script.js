console.log(1+1);// basic printing 

// type conversion and coersion
console.log ('5' + 6); //56
console.log('5' - 6); // -1
console.log(String(5)+6); //56

//truthy and falsy values,combined conditions
let age=24;
if(age>18 && age<65){
    console.log('You are eligible to work');
}
else{
    console.log('You are not eligible to work');
}

//switch case
let day = 'Monday'; 
switch(day){
    case 'Monday':
        console.log('Today is Monday');
        break;
    case 'Tuesday':
        console.log('Today is Tuesday');
        break;
    default:
        console.log('Not a valid day');
}

// == and === operator
let a = 5;
let b = '5';
console.log(a == b); // true
console.log(a === b); // false

// loop

/* Task 1: Print name, course and a number */
console.log("Name: Uthra");
console.log("Course: cyber");
console.log("Number: 59");

/* Task 2: Create variables and print them */
let eventName = "College Cultural Event";
let ticketPrice = 20;
let seatsLeft = 5; 
console.log("Event Name:", eventName);
console.log("Ticket Price:", ticketPrice);
console.log("Seats Left:", seatsLeft);

/* Task 3: Calculate total price for 3 tickets */
let totalPrice = ticketPrice * 3;

console.log("Total Price:", totalPrice);
console.log("Exceeds 500:", totalPrice > 500);

/* Task 4: Check positive, zero or negative */
let number = -5;

if (number > 0) {
    console.log("Positive number");
} else if (number === 0) {
    console.log("Zero");
} else {
    console.log("Negative number");
}

/* Task 5: Print even numbers from 2 to 10 */
for (let i = 2; i <= 10; i += 2) {
    console.log(i);
}
/* basic function task*/
function first() {
    console.log(10);
}

function second() {
    return 10;
}

let s = first();   // Prints 10
let r = second();  // Stores 10 in b

console.log(s);    // undefined
console.log(r)  // 10

/* arrow function */

const isEven = num => num % 2 === 0;

console.log(isEven(8));
console.log(isEven(7));


// array

/* Task 1: Calculate total price */
function calculateTotal(price, quantity) {
    return price * quantity;
}

console.log(calculateTotal(200, 3)); // 600


/* Task 2: Function that accepts a name and prints a greeting */
function greet(name) {
    console.log("Hello, " + name + "! Welcome.");
}

greet("Uthra"); // Hello, Uthra! Welcome.


/* Task 3: Create an array of five event names and print its length */
let events = [
    "Sports Day",
    "Cultural Fest",
    "Tech Fest",
    "Hackathon",
]
console.log(events.length); // 4


/* Task 4: Use filter() to keep numbers greater than 10 */
let numbers = [5, 12, 8, 20, 15, 3];

let filteredNumbers = numbers.filter(num => num > 10);

console.log(filteredNumbers); // [12, 20, 15] 


/* Task 5: Use map() to double each number */
let values = [1, 2, 3, 4, 5];

let doubledValues = values.map(num => num * 2);

console.log(doubledValues); // [2, 4, 6, 8, 10] 


/* Task 6: Use reduce() to calculate the total */
let prices = [20, 30, 40];

let total = prices.reduce((sum, price) => sum + price, 0);

console.log(total); // 90

/*  explain which methods are used to change the oringal array 
  filter, map, reduse */

/*Array and objects */

//Task 1: Create a book object and update its price

const book = {
    title: "JavaScript Basics",
    author: "John",
    price: 500
};

console.log(book);

book.price = 600;

console.log("Updated price:", book.price);

// Task 2: Create a nested user object and print the city
 const user = {
    name: "Uthra",
    age: 21,
    address: {
        city: "Chennai",
        state: "Tamil Nadu"
    }
};

console.log(user.address.city);

// Task 3: Create an array of three product objects and print each product name
const products = [
    { name: "Laptop", price: 50000 },
    { name: "Mouse", price: 500 },
    { name: "Keyboard", price: 1200 }
];

products.forEach(product => {
    console.log(product.name);
});
// Task 4: Use destructuring to extract two properties
const student = {
    name: "Uthra",
    course: "Computer Science",
    mark: 90
};

const { name, course } = student;

console.log(name);
console.log(course);

// Task 5: spread  

const arr1 = [10, 20, 30];
const arr2 = [40, 50, 60];
const copy = [...arr1];
const combined = [...arr1, ...arr2];

console.log("Original:", arr1);
console.log("Copy:", copy);
console.log("Combined:", combined);

// Task 6: Rest parameters
function addNumbers(...numbers) {
    let total = 0;

    for (let num of numbers) {
        total += num;
    }

    return total;
}

console.log(addNumbers(10, 20));
console.log(addNumbers(10, 20, 30, 40));
console.log(addNumbers(1, 2, 3, 4, 5));

// Task 7: Use optional chaining and ?? for a missing city
const user1 = {
    name: "Uthra",
    address: {
        city: "Chennai"
    }
};

const user2 = {
    name: "Priya"
};

console.log(user1.address?.city ?? "City not available");
console.log(user2.address?.city ?? "City not available");

// scope, hosting , tdz, clouse

//Task 1: global scope 
let campusName = "SA Engineering College";

function displayCampus() {
    console.log(campusName);
}

displayCampus();

//Task 2:
function checkScope() {
    if (true) {
        let a = 10;
        var b = 20;

        console.log("Inside block, a:", a);
        console.log("Inside block, b:", b);
    }

    // console.log(a); // ReferenceError: a is not defined
    console.log("Outside block, b:", b);
}

checkScope();

//Task 3: Hosting 
console.log(e); // undefined
// console.log(b); // ReferenceError

var e = 10;
let d= 20;

console.log(e); // 10
console.log(d); // 20

// Task 4: clourse
function makeCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
