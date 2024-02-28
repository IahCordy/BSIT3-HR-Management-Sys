const calendar = document.querySelector(".calendars"),
date = document.querySelector(".date"),
daysContainer = document.querySelector(".days"),
prev = document.querySelector(".prev");
next = document.querySelector(".next"),
todbtn = document.querySelector(".tod-btn"),
todobtn = document.querySelector(".todo-btn"),
dateinput = document.querySelector(".date-input")




let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function initCalendar(){
    const firstDay= new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const incomDays = 8 - lastDay.getDay() - 1;


    date.innerHTML = months[month] + " " + year;
    let days = " ";
    for (let x = day; x > 1 ; x--){
        days += `<div class="day prev-date" >${prevDays - x + 1}</div>`;
    }

for (let i = 1; i <= lastDate; i++){
    if (
    i === new Date().getDate() && 
    year === new Date().getFullYear() && 
    month === new Date().getMonth()
    ){
        days += `<div class="day today" >${i}</div>`;
    }
    else{
        days += `<div class="day " >${i}</div>`;
    }   
}
for(let j = 1; j <= incomDays; j++){
    days += `<div class="day incom-date">${j}</div>`;
}
    daysContainer.innerHTML = days;


}
    initCalendar();

function prevMonth(){
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    initCalendar();
}
function nextMonth(){
    month ++;
    if(month > 11){
        month = 0;
        year++;
}
    initCalendar();
}
prev.addEventListener("click" , prevMonth);
next.addEventListener("click" , nextMonth);

todbtn.addEventListener("click",()=>{
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();

});
dateinput.addEventListener("input",(e)=>{
    dateinput.value = dateinput.value.replace(/[^0-9/]/g, "");
    if (dateinput.value.length == 3){
      
    }
    if(dateinput.value.length > 7){
        dateinput.value = dateinput.value.slice(0, 7);
    }
    if(e.inputType === "deleteContentBackward"){
        if(dateinput.value.length === 3){
            dateinput.value = dateinput.value.slice(0,2);
        }
    }
});
todobtn.addEventListener("click",todoDate);
function todoDate(){
    const dateArr = dateinput.value.split("/");
    if(dateArr.length ===2) {
        if(dateArr[0]> 0 && dateArr[0] < 13 && dateArr[1].length === 4){
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Invalid Date"); 
}


const addEventBtn = document.querySelector(".add-event");
const addEventContainer = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");

 addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
 });
 addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
 });

  
