document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const statusMessage = document.getElementById("statusMessage");
    const currentMonth = document.getElementById("currentMonth");
    const prevMonth = document.getElementById("prevMonth");
    const nextMonth = document.getElementById("nextMonth");
    let today = new Date();
    let currentDate = new Date(today.getFullYear(), today.getMonth(), 1);
    let markedDays = JSON.parse(localStorage.getItem("markedDays")) || {};
    
    function renderCalendar() {
        calendar.innerHTML = "";
        currentMonth.textContent = currentDate.toLocaleString("es-ES", { month: "long", year: "numeric" });
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        let lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        let todayDate = today.getDate();
        let todayMonth = today.getMonth();
        let todayYear = today.getFullYear();
        
        for (let i = 1; i <= lastDate; i++) {
            let dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.classList.add("day");
            let dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${i}`;
            
            if (markedDays[dateKey] === "marked") {
                dayDiv.classList.add("marked");
            } else if (markedDays[dateKey] === "missed") {
                dayDiv.classList.add("missed");
            }
            
            if (currentDate.getFullYear() < todayYear || (currentDate.getFullYear() === todayYear && currentDate.getMonth() < todayMonth)) {
                if (!markedDays[dateKey]) {
                    dayDiv.classList.add("missed");
                    markedDays[dateKey] = "missed";
                }
                dayDiv.style.pointerEvents = "none";
            } else if (i < todayDate && currentDate.getMonth() === todayMonth && currentDate.getFullYear() === todayYear) {
                if (!markedDays[dateKey]) {
                    dayDiv.classList.add("missed");
                    markedDays[dateKey] = "missed";
                }
                dayDiv.style.pointerEvents = "none";
            } else if (i === todayDate && currentDate.getMonth() === todayMonth && currentDate.getFullYear() === todayYear) {
                dayDiv.addEventListener("click", function () {
                    if (!dayDiv.classList.contains("marked")) {
                        dayDiv.classList.add("marked");
                        markedDays[dateKey] = "marked";
                        updateStatusMessage();
                        saveToLocalStorage();
                    }
                });
            } else {
                dayDiv.style.pointerEvents = "none";
            }
            
            calendar.appendChild(dayDiv);
        }
        updateStatusMessage();
    }
    
    function updateStatusMessage() {
        let todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        if (markedDays[todayKey] === "marked") {
            statusMessage.textContent = "Estás al día con las pastillas";
            statusMessage.style.color = "green";
        } else {
            statusMessage.textContent = "No has tomado la pastilla de hoy";
            statusMessage.style.color = "red";
        }
    }
    
    function saveToLocalStorage() {
        localStorage.setItem("markedDays", JSON.stringify(markedDays));
    }
    
    prevMonth.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    nextMonth.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    renderCalendar();
});

