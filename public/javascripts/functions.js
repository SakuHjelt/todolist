// getting all previous data entries
getAll();

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


function getAll() {
    url = 'http://localhost:3000/api/data'
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            console.log(data[0].title);
            for (i = 0; i < data.length; i++) {
                console.log(data[i].title);

                let prevDataDiv = document.getElementById('prevData');

                let prevDiv = document.createElement('div');
                let prevTitle = document.createElement('h3');
                let prevDesc = document.createElement('p');

                let prevTitleNode = document.createTextNode(data[i].title)
                let prevDescNode = document.createTextNode(data[i].desc);

                prevTitle.appendChild(prevTitleNode);
                prevDesc.appendChild(prevDescNode);

                prevDiv.appendChild(prevTitle);
                prevDiv.appendChild(prevDesc);

                prevDataDiv.appendChild(prevDiv);
            }
        })
};


