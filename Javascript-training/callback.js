console.log("start");// print 1
setTimeout(() => console.log("Timer"), 0);// print 4
Promise.resolve().then(() => console.log("promise"));// print 3
console.log("Finish");// print 2

// promise tasks ( learning code)
function register(isSuccessful) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccessful) {
                resolve("Registration confirmed");
            } else {
                reject(new Error("Registration failed"));
            }
        }, 1000);
    });
}
register(true).then(console.log).catch(console.error)
register(false).then(console.log).catch((err) => console.log(err.message))

// async tasks (learing code)
function fetchEvent() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Tech Task")
        }, 2000)
    })
}
function fetchVenue() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Seminar Hall")
        }, 1000)
    })
}
async function loadPageData() {
    const [event, venue] = await Promise.all([fetchEvent(), fetchVenue()]);
    console.log(event);
    console.log(venue);
}
loadPageData();