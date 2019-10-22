document.getElementById("addButton").addEventListener("click", todoObject);

function todoObject() {
    let title = document.getElementById("todoTitle").value;
    let description = document.getElementById("todoDescription").value;

    const newTodo = {
        title: title, 
        description: description
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