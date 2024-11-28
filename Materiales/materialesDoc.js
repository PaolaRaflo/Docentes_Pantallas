document.addEventListener("DOMContentLoaded", function () {
    const ingresarButtons = document.querySelectorAll(".btn-ingresar");

    ingresarButtons.forEach((button) => {
        button.addEventListener("click", function () {
            alert(`Ingresando al curso: ${this.parentElement.querySelector(".card-title").textContent}`);
        });
    });
});


const courses = [
    { name: "ÁLGEBRA", area: "Ciencias", aula: "B-01" },
    { name: "ARITMÉTICA", area: "Ciencias", aula: "B-02" },
    { name: "FÍSICA", area: "Ciencias", aula: "B-03" },
    { name: "GEOMETRÍA", area: "Ciencias", aula: "B-04" },
    { name: "TRIGONOMETRÍA", area: "Ciencias", aula: "B-05" },
    { name: "RAZONAMIENTO MATEMÁTICO", area: "Ciencias", aula: "B-06" },
    { name: "BIOLOGÍA", area: "Ciencias", aula: "B-07" },
    { name: "QUÍMICA", area: "Ciencias", aula: "B-08" },
    { name: "HISTORIA", area: "Letras", aula: "B-08" },
    { name: "ECONOMÍA", area: "Letras", aula: "B-08" },
    { name: "GEOGRAFÍA", area: "Letras", aula: "B-08" },
    { name: "CÍVICA", area: "Letras", aula: "B-08"  },
    { name: "PSICOLOGÍA", area: "Letras", aula: "B-08" },
    { name: "FILOSOFÍA", area: "Letras", aula: "B-08" },
    { name: "RAZONAMIENTO VERBAL", area: "Letras", aula: "B-08" },
    { name: "LITERATURA", area: "Letras", aula: "B-08" },
    { name: "CULTURA GENERAL", area: "Letras", aula: "B-08" },
];

function loadCourses() {
    const container = document.getElementById("course-container");
    let html = "";

    courses.forEach((course) => {
        html += `
            <div class="col-md-4 col-sm-6 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-0">${course.name}</h6>
                            <small class="text-muted">Aula: ${course.aula}</small>
                        </div>
                        <a href="cursosDoc.html?course=${encodeURIComponent(course.name)}" class="btn btn-sm btn-success">INGRESAR</a>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", loadCourses);
