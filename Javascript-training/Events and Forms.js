
/* Task 1: Update status when button is clicked */
const statusBtn = document.getElementById("statusBtn");
const status = document.getElementById("status");

statusBtn.addEventListener("click", function () {
    status.textContent = "Button clicked successfully!";
});


/* Task 2: Show live character count */
const message = document.getElementById("message");
const count = document.getElementById("count");

message.addEventListener("input", function () {
    count.textContent = message.value.length;
});


/* Task 3 & 4: Registration form validation */
const form = document.getElementById("registrationForm");
const name = document.getElementById("name");
const email = document.getElementById("email");
const feedback = document.getElementById("feedback");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (name.value.trim() === "" || email.value.trim() === "") {
        feedback.textContent = "Please fill in all fields.";
        feedback.className = "error";
    } else {
        feedback.textContent = "Registration successful!";
        feedback.className = "success";
    }
});


/* Challenge: Create three event cards */
const events = [
    { title: "Sports Day", date: "25 October" },
    { title: "Cultural Fest", date: "30 October" },
    { title: "Hackathon", date: "5 November" }
];

const eventCards = document.getElementById("event-cards");
const joinStatus = document.getElementById("joinStatus");

events.forEach(function (event, index) {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
        <h3>${event.title}</h3>
        <p>Date: ${event.date}</p>
        <button data-index="${index}">Join</button>
    `;

    eventCards.appendChild(card);
});

// One parent listener handles all Join buttons
eventCards.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        const index = event.target.dataset.index;
        joinStatus.textContent =
            "You joined " + events[index].title + "!";
    }
});
