
document.addEventListener('DOMContentLoaded', () => {
    loadtasks();
});

    
    const taskList = document.getElementById("taskList");
    const input = document.querySelector("input");

    function enter(event){
        if(event.key === "Enter"){
            add();
        }
    }

    function add(text , done) {
        const task = text || input.value.trim();
        if (task === "") return;

        const listItem = document.createElement("li");

        const checkBox = document.createElement("img");
        checkBox.classList.add("checkbox");
        checkBox.setAttribute("src", "img/square.png");
        checkBox.setAttribute("onclick", "toggle(this)");
        
        const taskText = document.createElement("span");
        taskText.classList.add("taskText");
        taskText.textContent = task;
        if (done) taskText.classList.add("done");

        const img = document.createElement("img");
        img.setAttribute("src", "img/clear.png");
        img.setAttribute("role", "button");
        img.setAttribute("onclick", "remove(this)");
        img.classList.add("image");


        const container = document.createElement("div");
        container.classList.add("container");
        container.append(checkBox, taskText);

        listItem.append(container, img);
        taskList.appendChild(listItem);

        setEditTask();
        saveTasks();
        if (!text) input.value = "";
    }

    function remove(img) {
        const listItem = img.closest('li');
        if(listItem){
            listItem.remove();
        }
        saveTasks();
    }

    function toggle(img){
        const task = img.nextElementSibling;

        if(task.classList.contains("done")){
            img.src = "img/square.png";
            task.classList.remove("done");
        } else {
            img.src = "img/check.png";
            task.classList.add("done");
        }
        saveTasks();
    }

    function setEditTask() {
        const tasks = document.querySelectorAll('.taskText');
        tasks.forEach(task => {
            task.addEventListener('click', function() {
                const originalText = task.textContent;
                const elementClasses = task.classList;
                let originalStyle;
                if(elementClasses[1] === "done"){
                    originalStyle = elementClasses[1];
                } else {
                    originalStyle = false;
                }
                const input = document.createElement("input");
                input.type ="text";
                input.value = originalText;
                input.classList.add('edit-input');

                task.replaceWith(input);
                input.focus();

                input.addEventListener('keyup', function(e) {
                    if (e.key === 'Enter') {
                        saveEdit(input, originalText, originalStyle);
                    }
                });
                
                input.addEventListener('blur', function() {
                    saveEdit(input, originalText, originalStyle);
                });
            });
        })       
    }

    function saveEdit(inputField, text, style) {
        if (inputField._alreadySaved) return; // evita doppio salvataggio di blur e keyup
        inputField._alreadySaved = true;

        const newText = inputField.value.trim();
        const taskText = document.createElement('span');
        taskText.textContent = newText || text; // Se è vuoto mantiene il testo originale
        taskText.classList.add('taskText');
        if(style){
            taskText.classList.add(style);
        }
        inputField.replaceWith(taskText);
        
        setEditTask(taskText);
        saveTasks();
    }

    function saveTasks() {
        const items = [];
    
        document.querySelectorAll('#taskList li').forEach(li => {
            const task = li.querySelector('.taskText');
            const text = task.textContent;
            const done = task.classList.contains('done');
            items.push({ text, done });
        });
    
        localStorage.setItem('tasks', JSON.stringify(items));
    }

    function loadtasks() {
        const salvati = JSON.parse(localStorage.getItem('tasks')) || [];
    
        salvati.forEach(task => {
            add(task.text, task.done);
        });
    }

    function deleteAll(){
        document.querySelector(".popup").style.display = "flex";
    }

    function confirmDelete(){
        localStorage.removeItem("tasks");
        loadtasks();
        taskList.innerHTML = "";
        document.querySelector(".popup").style.display = "none";
        const input = document.querySelector("#input");
        input.value = "";
    }

    function cancel(){
        document.querySelector(".popup").style.display = "none";
    }