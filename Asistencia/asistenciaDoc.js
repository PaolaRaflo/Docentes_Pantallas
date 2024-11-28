// Genera las semanas con cursos específicos y separa día y fecha
function generateWeeksForTeachers(startDate, numWeeks) {
    const weeks = [];
    const courses = ["Geometría", "Trigonometría", "Química", "Física"];
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // Milisegundos en una semana
    let currentDate = new Date(startDate);

    for (let i = 1; i <= numWeeks; i++) {
        const weekCourses = [];
        for (let j = 0; j < courses.length; j++) {
            const hoursDaily = 8;
            const attendedHours = Math.floor(Math.random() * hoursDaily); // Horas asistidas aleatorias
            const missedHours = hoursDaily - attendedHours;

            weekCourses.push({
                course: courses[j],
                date: currentDate.toLocaleDateString("es-ES"),
                day: daysOfWeek[j % daysOfWeek.length],
                attendedHours: attendedHours,
                missedHours: missedHours,
            });

            currentDate.setDate(currentDate.getDate() + 1);
        }
        weeks.push({
            week: i.toString(),
            range: `${weekCourses[0].date} - ${weekCourses[3].date}`,
            courses: weekCourses,
        });
        currentDate = new Date(currentDate.getTime() + (oneWeek - 4 * 24 * 60 * 60 * 1000)); // Ajuste para una semana de 4 días
    }
    return weeks;
}

// Genera 16 semanas a partir del 14 de octubre de 2024
const teacherWeeksData = generateWeeksForTeachers("2024-10-14", 16);

// Calcula el resumen global de horas asistidas y faltadas
function calculateGlobalSummaryForTeachers() {
    let totalAttended = 0;
    let totalMissed = 0;

    teacherWeeksData.forEach((week) => {
        week.courses.forEach((course) => {
            totalAttended += course.attendedHours;
            totalMissed += course.missedHours;
        });
    });

    const totalHours = totalAttended + totalMissed;
    const attendancePercentage = ((totalAttended / totalHours) * 100).toFixed(0);
    const absencePercentage = ((totalMissed / totalHours) * 100).toFixed(0);

    return {
        percentages: {
            attendance: attendancePercentage,
            absence: absencePercentage,
        },
    };
}

// Calcula el resumen por semana
function calculateWeeklySummaryForTeachers(weekData) {
    const totalHours = weekData.courses.reduce((sum, course) => sum + course.attendedHours + course.missedHours, 0);
    const attendedHours = weekData.courses.reduce((sum, course) => sum + course.attendedHours, 0);
    const missedHours = weekData.courses.reduce((sum, course) => sum + course.missedHours, 0);

    return {
        summary: `${attendedHours} Horas Asistidas | ${missedHours} Horas Faltadas`,
    };
}

// Renderiza la semana actual con un diseño renovado
function renderWeekForTeachers() {
    const weekData = teacherWeeksData[currentWeek];
    const globalSummary = calculateGlobalSummaryForTeachers();
    const weeklySummary = calculateWeeklySummaryForTeachers(weekData);

    // Actualiza el número de la semana
    document.getElementById("week-number").innerText = weekData.week;
    

    // Actualiza los porcentajes globales dinámicamente
    document.querySelector(".attendance-percentage").innerText = `${globalSummary.percentages.attendance}%`;
    document.querySelector(".absence-percentage").innerText = `${globalSummary.percentages.absence}%`;

    // Resumen semanal
    const summaryContainer = document.getElementById("summary-container");
    summaryContainer.innerHTML = `
        <div class="summary-total mb-3 text-dark ">
            <strong>Resumen:</strong> ${weeklySummary.summary}
        </div>
    `;

    // Lista de cursos y horas con diseño visual
    const container = document.getElementById("attendance-container");
    container.innerHTML = `
        <h6 class="text-dark ">Semana ${weekData.week}: ${weekData.range}</h6>
        <div class="table-wrapper">
            <table class="table table-bordered table-hover text-center">
                <thead class="thead-light">
                    <tr>
                        <th>Curso</th>
                        <th>Día</th>
                        <th>Fecha</th>
                        <th>Horas</th>
                    </tr>
                </thead>
                <tbody>
                    ${weekData.courses
                        .map(
                            (course) => `
                        <tr>
                            <td>${course.course}</td>
                            <td>${course.day}</td>
                            <td>${course.date}</td>
                            <td>
                                <div class="hours-bar">
                                    <div class="bar attended" style="width: ${course.attendedHours * 12.5}%;"></div>
                                    <div class="bar missed" style="width: ${course.missedHours * 12.5}%;"></div>
                                </div>
                                <div class="hours-text">
                                    <span class="text-success">${course.attendedHours} h asistidas</span> | 
                                    <span class="text-danger">${course.missedHours} h faltadas</span>
                                </div>
                            </td>
                        </tr>
                    `
                        )
                        .join("")}
                </tbody>
            </table>
        </div>
    `;
}

// Cambia a la siguiente semana
function nextWeekForTeachers() {
    if (currentWeek < teacherWeeksData.length - 1) {
        currentWeek++;
        renderWeekForTeachers();
    }
}

// Cambia a la semana anterior
function prevWeekForTeachers() {
    if (currentWeek > 0) {
        currentWeek--;
        renderWeekForTeachers();
    }
}

// Render inicial
let currentWeek = 0;
renderWeekForTeachers();
