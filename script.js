// ===============================
// البيانات
// ===============================

let subjects =
    JSON.parse(localStorage.getItem("subjects")) || [];

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


// ===============================
// حفظ البيانات
// ===============================

function saveData() {
    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// ===============================
// المواد
// ===============================

function addSubject() {

    let input =
        document.getElementById("subjectInput");

    let name =
        input.value.trim();

    if (name === "") {
        alert("اكتب اسم المادة");
        return;
    }

    subjects.push(name);

    saveData();

    input.value = "";

    showSubjects();

    updateStats();
}


function showSubjects() {

    let list =
        document.getElementById("subjectList");

    list.innerHTML = "";

    subjects.forEach(function(subject, index) {

        let item =
            document.createElement("li");

        item.innerHTML =
            `
            <span>📖 ${subject}</span>

            <button onclick="editSubject(${index})">
                ✏️
            </button>

            <button onclick="deleteSubject(${index})">
                🗑️
            </button>
            `;

        list.appendChild(item);
    });
}


function editSubject(index) {

    let newName =
        prompt(
            "اكتب الاسم الجديد:",
            subjects[index]
        );

    if (newName === null) {
        return;
    }

    newName =
        newName.trim();

    if (newName === "") {
        return;
    }

    subjects[index] =
        newName;

    saveData();

    showSubjects();
}


function deleteSubject(index) {

    subjects.splice(index, 1);

    saveData();

    showSubjects();

    updateStats();
}


// ===============================
// المهام
// ===============================

function addTask() {

    let input =
        document.getElementById("taskInput");

    let name =
        input.value.trim();

    if (name === "") {
        alert("اكتب المهمة");
        return;
    }

    tasks.push({
        name: name,
        completed: false
    });

    saveData();

    input.value = "";

    showTasks();

    updateStats();
}


function showTasks() {

    let list =
        document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach(function(task, index) {

        let item =
            document.createElement("li");

        item.innerHTML =
            `
            <input
                type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="completeTask(${index})"
            >

            <span>
                ${task.name}
            </span>

            <button onclick="deleteTask(${index})">
                🗑️
            </button>
            `;

        list.appendChild(item);
    });
}


function completeTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveData();

    showTasks();

    updateStats();
}


function deleteTask(index) {

    tasks.splice(index, 1);

    saveData();

    showTasks();

    updateStats();
}


// ===============================
// الإحصائيات
// ===============================

function updateStats() {

    document.getElementById(
        "subjectsCount"
    ).textContent =
        subjects.length;


    document.getElementById(
        "tasksCount"
    ).textContent =
        tasks.length;


    let completed = 0;

    tasks.forEach(function(task) {

        if (task.completed) {
            completed++;
        }

    });


    let progress = 0;

    if (tasks.length > 0) {

        progress =
            Math.round(
                completed /
                tasks.length *
                100
            );
    }


    document.getElementById(
        "progress"
    ).textContent =
        progress + "%";
}


// ===============================
// المؤقت
// ===============================

let timeLeft = 25 * 60;

let timerRunning = false;

let timerInterval;


function updateTimer() {

    let minutes =
        Math.floor(timeLeft / 60);

    let seconds =
        timeLeft % 60;


    document.getElementById(
        "timer"
    ).textContent =

        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(seconds).padStart(2, "0");
}


function startTimer() {

    if (timerRunning) {
        return;
    }

    timerRunning = true;


    timerInterval =
        setInterval(function() {

            if (timeLeft > 0) {

                timeLeft--;

                updateTimer();

            } else {

                clearInterval(
                    timerInterval
                );

                timerRunning = false;

                alert(
                    "🎉 انتهى وقت المذاكرة!"
                );
            }

        }, 1000);
}


function pauseTimer() {

    clearInterval(
        timerInterval
    );

    timerRunning = false;
}


function resetTimer() {

    pauseTimer();

    timeLeft =
        25 * 60;

    updateTimer();
}


// ===============================
// الوضع الليلي
// ===============================

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark"
    );


    let dark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "darkMode",
        dark
    );
}


function loadDarkMode() {

    let dark =
        localStorage.getItem(
            "darkMode"
        );


    if (dark === "true") {

        document.body.classList.add(
            "dark"
        );
    }
}


// ===============================
// حذف كل البيانات
// ===============================

function clearAllData() {

    let answer =
        confirm(
            "هل تريد حذف كل البيانات؟"
        );

    if (!answer) {
        return;
    }


    subjects = [];

    tasks = [];

    saveData();

    showSubjects();

    showTasks();

    updateStats();
}


// ===============================
// تشغيل التطبيق
// ===============================

showSubjects();

showTasks();

updateStats();

updateTimer();

loadDarkMode();