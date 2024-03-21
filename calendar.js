const calendar = document.querySelector(".calendars"),
date = document.querySelector(".date"),
daysContainer = document.querySelector(".days"),
prev = document.querySelector(".prev"),
next = document.querySelector(".next"),
todbtn = document.querySelector(".tod-btn"),
todobtn = document.querySelector(".todo-btn"),
dateinput = document.querySelector(".date-input"),
eventDay = document.querySelector(".event-day"),
eventDate = document.querySelector(".event-date"),
eventsContainer = document.querySelector(".events"),
addEventSubmit = document.querySelector(".add-event-btn");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

let eventsArr = [];
getEvents();

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const incomDays = 7 - lastDay.getDay();

    date.innerHTML = months[month] + " " + year;
    let days = "";
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
    for (let i = 1; i <= lastDate; i++) {
        let event = eventsArr.find(event => event.day === i && event.month === month + 1 && event.year === year);
        if (i === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            days += event ? `<div class="day today active event">${i}</div>` : `<div class="day today active">${i}</div>`;
        } else {
            days += event ? `<div class="day event">${i}</div>` : `<div class="day">${i}</div>`;
        }
    }
    for (let j = 1; j <= incomDays; j++) {
        days += `<div class="day incom-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListener();
}
initCalendar();

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

todbtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});
dateinput.addEventListener("input", (e) => {
    dateinput.value = dateinput.value.replace(/[^0-9/]/g, "");
    if (dateinput.value.length > 7) {
        dateinput.value = dateinput.value.slice(0, 7);
    }
    if (e.inputType === "deleteContentBackward" && dateinput.value.length === 3) {
        dateinput.value = dateinput.value.slice(0, 2);
    }
});
todobtn.addEventListener("click", todoDate);
function todoDate() {
    const dateArr = dateinput.value.split("/");
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Invalid Date");
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
    if (e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
});

addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});
addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            activeDay = Number(e.target.innerHTML);
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            days.forEach((day) => {
                day.classList.remove("active");
            });
            if (e.target.classList.contains("prev-date")) {
                prevMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains("incom-date")) {
                nextMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (!day.classList.contains("incom-date") && day.innerHTML === e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add("active");
            }
        });
    });
}

function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        if (date === event.day && month + 1 === event.month && year === event.year) {
            event.events.forEach((event) => {
                events += `
                <div class="event"> 
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${event.time}</span>
                    </div>
                </div>`;
            });
        }
    });
    if (events === "") {
        events = `<div class="no-event"><h3>No Events</h3></div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
}

addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
        alert("Please Fill all the Fields");
        return;
    }
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (timeFromArr.length != 2 || timeToArr.length != 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59) {
        alert("Invalid Time Format!");
        return;
    }
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
    };

    let eventAdded = false;
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (item.day === activeDay && item.month === month + 1 && item.year === year) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }
    addEventContainer.classList.remove("active");
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    updateEvents(activeDay);

    const activeDayElem = document.querySelector(".day.active");
    if (activeDayElem && !activeDayElem.classList.contains("event")) {
        activeDayElem.classList.add("event");
    }
});

function convertTime(time) {
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour > 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + " : " + timeMin + " " + timeFormat;
    return time;
}

eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        const eventTitle = e.target.querySelector(".event-title").innerHTML;
        eventsArr.forEach((event) => {
            if (event.day === activeDay && event.month === month + 1 && event.year === year) {
                event.events.forEach((item, index) => {
                    if (item.title === eventTitle) {
                        event.events.splice(index, 1);
                    }
                });
                if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                    const activeDayElem = document.querySelector(".day.active")
                    if (activeDayElem && activeDayElem.classList.contains("event")) {
                        activeDayElem.classList.remove("event");
                    }
                }
            }
        });
        updateEvents(activeDay);
    }
});

function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
    if (localStorage.getItem("events") !== null) {
        eventsArr.push(...JSON.parse(localStorage.getItem("events")));
    }
}