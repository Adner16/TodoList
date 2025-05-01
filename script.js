
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
        img.src = "square.png";
        task.classList.remove("done");
    } else {
        img.src = "check.png";
        task.classList.add("done");
    }
}