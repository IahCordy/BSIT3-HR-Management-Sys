   // JavaScript to handle month and year navigation
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
   const currentDate = new Date();
   let currentMonth = currentDate.getMonth();
   let currentYear = currentDate.getFullYear();

   const currentMonthElement = document.getElementById('currentMonth');
   const currentYearElement = document.getElementById('currentYear');

   function updateDate() {
       currentMonthElement.textContent = months[currentMonth];
       currentYearElement.textContent = currentYear;
   }

   function prevMonth() {
       if (currentMonth === 0) {
           currentMonth = 11;
           currentYear--;
       } else {
           currentMonth--;
       }
       updateDate();
       // You can also trigger a function here to update the data for the selected month and year
   }

   function nextMonth() {
       if (currentMonth === 11) {
           currentMonth = 0;
           currentYear++;
       } else {
           currentMonth++;
       }
       updateDate();
       // You can also trigger a function here to update the data for the selected month and year
   }

   function prevYear() {
       currentYear--;
       updateDate();
       // You can also trigger a function here to update the data for the selected month and year
   }

   function nextYear() {
       currentYear++;
       updateDate();
       // You can also trigger a function here to update the data for the selected month and year
   }

   document.getElementById('prevMonth').addEventListener('click', prevMonth);
   document.getElementById('nextMonth').addEventListener('click', nextMonth);
   document.getElementById('prevYear').addEventListener('click', prevYear);
   document.getElementById('nextYear').addEventListener('click', nextYear);

   // Initialize date on page load
   updateDate();