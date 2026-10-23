
/* Task 1: Save a favourite colour in localStorage */
localStorage.setItem("favouriteColour", "Blue");

console.log("Favourite Colour:", localStorage.getItem("favouriteColour"));


/* Task 2: Save a temporary step number in sessionStorage */
sessionStorage.setItem("stepNumber", "3");

console.log("Step Number:", sessionStorage.getItem("stepNumber"));
if (stepNumber === null){
    stepNumber =1;
}else{
stepNumber = Number(stepNumber) + 1;
}

/* Task 3: Store three book titles as an array */
const books = ["JavaScript Basics", "HTML Guide", "CSS Essentials"];

localStorage.setItem("books", JSON.stringify(books));

console.log("Books:", JSON.parse(localStorage.getItem("books")));


/* Task 4: Test the difference between localStorage and sessionStorage */
console.log("Local Storage:", localStorage.getItem("favouriteColour"));
console.log("Session Storage:", sessionStorage.getItem("stepNumber"));

/*
Refresh the page:
- Both values remain.

Close the tab and open the page again:
- localStorage remains.
- sessionStorage for the previous tab is cleared when that tab's session ends.
*/


/* Task 5: Inspect storage in DevTools */
/*
1. Open your webpage in Chrome.
2. Press F12.
3. Open Application.
4. Expand Storage.
5. Select Local Storage and your website.
6. Select Session Storage and your website.
*/
