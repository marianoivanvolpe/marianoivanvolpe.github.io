document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const currentMonth = document.getElementById("currentMonth");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const statusMessage = document.getElementById("statusMessage");

    let today = new Date();
    let selectedYear = today.getFullYear();
    let selectedMonth = today.getMonth();

    function renderCalendar(year, month) {
        calendar.innerHTML = "";
        let firstDay = new Date(year, month, 1).getDay();
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let todayDate = today.getDate();
        let isCurrentMonth = (year === today.getFullYear() && month === today.getMonth());
        let pastMarked = false;

        currentMonth.textContent = new Date(year, month).toLocaleString("es-ES", { month: "long", year: "numeric" });

        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement("div");
            day.classList.add("day");
            day.textContent = i;

            let storedValue = localStorage.getItem(`${year}-${month}-${i}`);

            if (storedValue === "marked") {
                day.classList.add("marked");
            } else if (isCurrentMonth && i < todayDate) {
                day.classList.add("unmarked-past");
                pastMarked = true;
            }

            if (!isCurrentMonth || i !== todayDate) {
                day.classList.add("disabled");
            }

            day.addEventListener("click", function () {
                if (isCurrentMonth && i === todayDate && !day.classList.contains("marked")) {
                    day.classList.add("marked");
                    localStorage.setItem(`${year}-${month}-${i}`, "marked");
                    updateMessage();
                }
            });

            calendar.appendChild(day);
        }

        updateMessage();
    }

    function updateMessage() {
        let todayKey = `${selectedYear}-${selectedMonth}-${today.getDate()}`;
        let isMarked = localStorage.getItem(todayKey) === "marked";
        statusMessage.textContent = isMarked ? "Estás al día con las pastillas" : "No has tomado la pastilla de hoy";
    }

    prevMonthBtn.addEventListener("click", function () {
        selectedMonth--;
        if (selectedMonth < 0) {
            selectedMonth = 11;
            selectedYear--;
        }
        renderCalendar(selectedYear, selectedMonth);
    });

    nextMonthBtn.addEventListener("click", function () {
        selectedMonth++;
        if (selectedMonth > 11) {
            selectedMonth = 0;
            selectedYear++;
        }
        renderCalendar(selectedYear, selectedMonth);
    });

    renderCalendar(selectedYear, selectedMonth);
});
