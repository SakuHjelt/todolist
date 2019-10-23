// const response =  fetch('../userData.json');

// console.log(JSON.stringify(response));
// console.log('moikka')


document.getElementById("addButton").addEventListener("click", todoObject);

function todoObject() {
    let title = document.getElementById("todoTitle").value;
    let desc = document.getElementById("todoDescription").value;

    const newTodo = {
        title: title, 
        description: desc
    }

    let form = document.getElementById("todoForm");

    let newTodoDiv = document.createElement("div");
    let newTodoTitle = document.createElement("h3");
    let newTodoParagraph = document.createElement("p");

    let newTitleNode = document.createTextNode(newTodo.title);
    let newDescNode = document.createTextNode(newTodo.description);

    newTodoTitle.appendChild(newTitleNode);
    newTodoParagraph.appendChild(newDescNode);

    newTodoDiv.appendChild(newTodoTitle);
    newTodoDiv.appendChild(newTodoParagraph);
    form.append(newTodoDiv);
}
