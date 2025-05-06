
const taskList = document.getElementById("taskList");
const input = document.querySelector("input");

function enter(event){
    if(event.key === "Enter"){
        add();
    }
}

function add() {
    const task = input.value.trim();
    if (task === "") return;

    const listItem = document.createElement("li");

    const checkBox = document.createElement("img");
    checkBox.classList.add("checkbox");
    checkBox.setAttribute("src", "img/square.png");
    checkBox.setAttribute("onclick", "toggle(this)")
    
    const taskText = document.createElement("span");
    taskText.classList.add("taskText");
    taskText.textContent = task;

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

    input.value = "";
}

function remove(img) {
    const listItem = img.closest('li');
    if(listItem){
        listItem.remove();
    }
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
    if (inputField._alreadySaved) return; // evita doppio salvataggio
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
}