document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.done) taskText.classList.add("done");

        
        const doneBtn = document.createElement("button");
        doneBtn.textContent = task.done ? "✅ Done" : "✔ Mark as Done";
        doneBtn.onclick = (e) => {
            e.stopPropagation();
            toggleTask(index);
        };

        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌ Delete";
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(taskText);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value.trim()) return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: input.value, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    loadTasks();
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
