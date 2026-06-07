// ==========================
// LOGIN CHECK
// ==========================

const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
    window.location.href = "index.html";
}

// ==========================
// ELEMENTS
// ==========================

const welcomeMessage =
    document.getElementById("welcomeMessage");

const currentDate =
document.getElementById("currentDate");

currentDate.textContent =
new Date().toLocaleDateString(
    "en-US",
    {
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric"
    }
);

const taskContainer =
    document.getElementById("taskContainer");

const emptyState =
    document.getElementById("emptyState");

const taskTitle =
    document.getElementById("taskTitle");

const taskDescription =
    document.getElementById("taskDescription");

const taskStatus =
    document.getElementById("taskStatus");

const addTaskBtn =
    document.getElementById("addTaskBtn");

const searchInput =
    document.getElementById("searchInput");

const filterStatus =
    document.getElementById("filterStatus");

// Stats

const totalTasks =
    document.getElementById("totalTasks");

const pendingTasks =
    document.getElementById("pendingTasks");

const holdTasks =
    document.getElementById("holdTasks");

const completedTasks =
    document.getElementById("completedTasks");

// ==========================
// TOAST
// ==========================

function showToast(message){

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    },3000);
}

// ==========================
// WELCOME USER
// ==========================

welcomeMessage.textContent =
`Welcome, ${loggedInUser.fullName} 👋`;

// ==========================
// TASKS
// ==========================

let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let editIndex = null;
let deleteIndex = null;

// ==========================
// SAVE
// ==========================

function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// ==========================
// HERO BUTTONS
// ==========================

function goToAddTask(){

    document
    .getElementById("addTaskSection")
    .scrollIntoView({
        behavior:"smooth"
    });

    setTimeout(() => {
        taskTitle.focus();
    },500);
}

function goToSearch(){

    document
    .getElementById("searchSection")
    .scrollIntoView({
        behavior:"smooth"
    });

    setTimeout(() => {
        searchInput.focus();
    },500);
}

// ==========================
// STATS
// ==========================

function updateStats(){

    totalTasks.textContent =
        tasks.length;

    pendingTasks.textContent =
        tasks.filter(
            task => task.status === "Pending"
        ).length;

    holdTasks.textContent =
        tasks.filter(
            task => task.status === "On Hold"
        ).length;

    completedTasks.textContent =
        tasks.filter(
            task => task.status === "Completed"
        ).length;
}

// ==========================
// DISPLAY TASKS
// ==========================

function displayTasks(){

    taskContainer.innerHTML = "";

    const search =
        searchInput.value.toLowerCase();

    const filter =
        filterStatus.value;

    const filteredTasks =
        tasks.filter(task => {

            const matchesSearch =
                task.title
                .toLowerCase()
                .includes(search);

            const matchesFilter =
                filter === "All"
                || task.status === filter;

            return matchesSearch &&
                   matchesFilter;
        });

    if(filteredTasks.length === 0){

        emptyState.style.display =
            "block";

    }else{

        emptyState.style.display =
            "none";
    }

    filteredTasks.forEach((task,index)=>{

    taskContainer.innerHTML += `

    <div class="task-card">

    <div class="task-header"
         onclick="toggleDetails(${index})">

        <div class="task-title">
            ${task.title}
        </div>

        <i class="fa-solid fa-chevron-down expand-icon"></i>

    </div>

    <div class="task-status-preview">

        <span class="${getStatusClass(task.status)} badge">

            ${task.status}

        </span>

    </div>

    <div
        class="task-details"
        id="details-${index}">

        <div class="task-description">
        
            ${task.description}

        </div>

        <div class="task-options">

            <button
                class="status-btn ${task.status === 'Completed' ? 'active' : ''}"
                onclick="setStatus(${index},'Completed')">

                Completed

            </button>

            <button
                class="status-btn ${task.status === 'On Hold' ? 'active' : ''}"
                onclick="setStatus(${index},'On Hold')">

                On Hold

            </button>

        </div>

        <div class="task-actions">

            <button
                class="btn-edit"
                onclick="editTask(${index})">

                Edit

            </button>

            <button
                class="btn-danger"
                onclick="deleteTask(${index})">

                Delete

            </button>

        </div>

      </div>

    </div>

    `;
});

    updateStats();
}

// ==========================
// EXPAND CARD
// ==========================

function toggleDetails(index){

    const details =
        document.getElementById(`details-${index}`);

    const card =
        details.closest(".task-card");

    details.classList.toggle("show");

    card.classList.toggle("active");
}

// ==========================
// STATUS CLASS
// ==========================

function getStatusClass(status){

    switch(status){

        case "Completed":
            return "completed";

        case "On Hold":
            return "hold";

        default:
            return "pending";
    }
}


// ==========================
// ADD / UPDATE
// ==========================

addTaskBtn.addEventListener(
    "click",
    ()=>{

        const title =
            taskTitle.value.trim();

        const description =
            taskDescription.value.trim();

        const status =
            taskStatus.value;

        if(!title || !description){

            showToast(
                "Fill all fields"
            );

            return;
        }

        if(editIndex === null){

            tasks.push({
                title,
                description,
                status
            });

            showToast(
                "Task added"
            );

        }else{

            tasks[editIndex] = {
                title,
                description,
                status
            };

            editIndex = null;

            addTaskBtn.textContent =
                "Add Task";

            showToast(
                "Task updated"
            );
        }

        saveTasks();

        taskTitle.value = "";
        taskDescription.value = "";
        taskStatus.value = "Pending";

        displayTasks();
    }
);

// ==========================
// EDIT
// ==========================

function editTask(index){

    taskTitle.value =
        tasks[index].title;

    taskDescription.value =
        tasks[index].description;

    taskStatus.value =
        tasks[index].status;

    editIndex = index;

    addTaskBtn.textContent =
        "Update Task";

    goToAddTask();
}

// ==========================
// DELETE
// ==========================

function deleteTask(index){

    deleteIndex = index;

    document
    .getElementById("deleteModal")
    .style.display = "flex";
}

// ==========================
// SEARCH
// ==========================

searchInput.addEventListener(
    "input",
    displayTasks
);

// ==========================
// FILTER
// ==========================

filterStatus.addEventListener(
    "change",
    displayTasks
);

// ==========================
// INITIAL LOAD
// ==========================

displayTasks();
function goToTasks(){

    filterStatus.value = "All";

    displayTasks();

    document
    .getElementById("tasksSection")
    .scrollIntoView({
        behavior:"smooth"
    });
}
function setStatus(index, status){

    tasks[index].status = status;

    saveTasks();

    displayTasks();

    showToast("Task status updated");
}
function closeModal(){

    document
    .getElementById("deleteModal")
    .style.display = "none";
}
document
.getElementById("confirmDelete")
.addEventListener("click",()=>{

    tasks.splice(deleteIndex,1);

    saveTasks();

    displayTasks();

    closeModal();

    showToast("Task deleted");
});