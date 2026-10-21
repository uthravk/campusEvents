
/* Task 1: Change heading text */
const heading = document.getElementById("heading");
heading.textContent = "Upcoming Campus Events";


/* Task 2: Highlight all event cards */
const cards = document.querySelectorAll(".event-card");

cards.forEach(card => {
    card.classList.add("highlight");
});


/* Task 3: Read input and display the name */
const nameInput = document.getElementById("nameInput");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");

submitBtn.addEventListener("click", () => {
    output.textContent = nameInput.value;
});


/* Task 4: Create a card from an object */
const event = {
    title: "Hackathon",
    date: "5 November"
};

const eventList = document.getElementById("event-list");

function createEventCard(event) {
    const card = document.createElement("div");
    card.classList.add("event-card", "highlight");

    const title = document.createElement("h3");
    title.textContent = event.title;

    const date = document.createElement("p");
    date.textContent = "Date: " + event.date;

    card.append(title, date);

    // Challenge: Remove only this card
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener("click", () => {
        card.remove();
    });

    card.appendChild(removeBtn);
    eventList.appendChild(card);
}

createEventCard(event);
