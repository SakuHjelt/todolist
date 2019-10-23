// getting all previous data entries
getAll();

document.getElementById("addButton").addEventListener("click", postNew);
// function todoObject(event) {

//     let title = document.getElementById("todoTitle").value;
//     let desc = document.getElementById("todoDescription").value;

//     const newTodo = {
//         title: title,
//         description: desc
//     }

//     let form = document.getElementById("todoForm");

//     let newTodoDiv = document.createElement("div");
//     let newTodoTitle = document.createElement("h3");
//     let newTodoParagraph = document.createElement("p");

//     let newTitleNode = document.createTextNode(newTodo.title);
//     let newDescNode = document.createTextNode(newTodo.description);

//     newTodoTitle.appendChild(newTitleNode);
//     newTodoParagraph.appendChild(newDescNode);

//     newTodoDiv.appendChild(newTodoTitle);
//     newTodoDiv.appendChild(newTodoParagraph);
//     form.append(newTodoDiv);
// }


function postNew() {
    event.preventDefault();

    let title = document.getElementById('todoTitle').value;
    let desc = document.getElementById('todoDescription').value;
    let items = {title: title, desc: desc}
    url = 'http://localhost:3000/api/data'
    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        //nreferrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(items) // body data type must match "Content-Type" header
    })
    .then((resp) => {
        getAll();
    })
    //return response.json(getAll); // parses JSON response into native JavaScript objects
    }

function getAll() {
    url = 'http://localhost:3000/api/data'
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            document.getElementById('prevData').innerHTML="";
            console.log(data[0].title);
            for (i = 0; i < data.length; i++) {
                console.log(data[i].title);

                let prevDataDiv = document.getElementById('prevData');

                let prevDiv = document.createElement('div');
                let prevTitle = document.createElement('h3');
                let prevDesc = document.createElement('p');
                let delBtn = document.createElement('button');
                delBtn.setAttribute("method", "delete");
                delBtn.innerText = "Delete"

                let prevTitleNode = document.createTextNode(data[i].title)
                let prevDescNode = document.createTextNode(data[i].desc);

                prevTitle.appendChild(prevTitleNode);
                prevDesc.appendChild(prevDescNode);

                prevDiv.appendChild(prevTitle);
                prevDiv.appendChild(prevDesc);
                prevDiv.appendChild(delBtn);

                prevDataDiv.appendChild(prevDiv);
            }
        })
};

function deleteItem(id) {
    console.log(id);
    $.ajax({
        url: `http://localhost:3000/api/topics/${id}`,
        type: "DELETE",
        success: function (result) {
            console.dir(result)
            getAll();
        }
    })
}