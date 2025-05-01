
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

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("custom-checkbox");
    
    const taskText = document.createElement("span");
    taskText.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.textContent = "Elimina";

    const container = document.createElement("div"); 
    container.append(checkBox, taskText);

    listItem.append(container, deleteBtn);
    taskList.appendChild(listItem);

    input.value = "";
}