
const taskList = document.getElementById("taskList");
const input = document.querySelector("input");

function enter(event){
    if(event.key === "Enter"){
        add();
    }
}

function add() {
    const task = input.value.trim();

    if (task !== "") {
    const newLi = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("custom-checkbox");
    const taskText = document.createElement("span");
    taskText.textContent = task;
    newLi.appendChild(checkBox);
    newLi.appendChild(taskText);
    taskList.appendChild(newLi);
    input.value = "";
    }
}