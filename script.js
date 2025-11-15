let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render ketika halaman pertama kali dibuka
window.onload = () => renderTodos();

function addTodo() {
    const text = document.getElementById("todo-input").value;
    const date = document.getElementById("todo-date").value;

    if (!text || !date) {
        alert("Isi task dan tanggal!");
        return;
    }

    todos.push({ text, date });
    localStorage.setItem("todos", JSON.stringify(todos));

    document.getElementById("todo-input").value = "";
    document.getElementById("todo-date").value = "";

    renderTodos();
}

function renderTodos() {
    const filter = document.getElementById("filter").value;
    const today = new Date().toISOString().split("T")[0];
    const list = document.getElementById("todo-list");

    let filtered = todos.filter(t => {
        if (filter === "today") return t.date === today;
        if (filter === "past") return t.date < today;
        if (filter === "upcoming") return t.date > today;
        return true;
    });

    list.innerHTML = "";

    if (filtered.length === 0) {
        list.innerHTML = "<li>No todos available</li>";
        return;
    }

    filtered.forEach(todo => {
        list.innerHTML += `
            <li class="pb-2">
                <p class="text-xl">${todo.text}
                <span class="text-sm text-gray-500">(${todo.date})</span></p>
                <hr>
            </li>
        `;
    });
}

function clearTodos() {
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
}
