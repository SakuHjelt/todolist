// Function to get all previous data entries when page reloads
getAll();
document.getElementById("addButton").addEventListener("click", postNew);

// function post new data entry and run function to get old entries
function postNew() {
    event.preventDefault();
    let title = document.getElementById('todoTitle').value;
    let desc = document.getElementById('todoDescription').value;
    if (title == '' || desc == ''){
        alert('All fields must include data')
    } else {
    let items = { title: title, desc: desc }
    url = 'http://localhost:3000/api/data'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(items)
    })
        .then((resp) => {
            getAll();
        })
}
}

// Function that gets all the old data entries
function getAll() {
    url = 'http://localhost:3000/api/data'
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            document.getElementById('prevData').innerHTML = "";
            for (i = 0; i < data.length; i++) {

                // selecting elements
                let prevDataDiv = document.getElementById('prevData');


                // creating new elements
                let prevDiv = document.createElement('div');
                let prevTitle = document.createElement('h3');
                let prevDesc = document.createElement('p');
                let prevId = document.createElement('p');

                let delBtn = document.createElement('button');
                let updateBtn = document.createElement('button');

                //styles and attributes
                prevDiv.setAttribute('id', 'toDoCollection');
                prevId.style.display = 'none';

                delBtn.setAttribute('onclick', `deleteData('${data[i].id}')`);
                delBtn.setAttribute('class', 'fa fa-trash')
                // delBtn.innerText = "Delete"

                updateBtn.setAttribute('onclick', `updateData('${data[i].title}','${data[i].desc}','${data[i].id}')`);
                // updateBtn.innerText = "Update"
                updateBtn.setAttribute('class', 'fa fa-edit');

                // nodes and appends
                let prevTitleNode = document.createTextNode(data[i].title)
                let prevDescNode = document.createTextNode(data[i].desc);
                let prevIdNode = document.createTextNode(data[i].id);

                prevTitle.appendChild(prevTitleNode);
                prevDesc.appendChild(prevDescNode);
                prevId.appendChild(prevIdNode);

                prevDiv.appendChild(prevTitle);
                prevDiv.appendChild(prevDesc);
                prevDiv.appendChild(delBtn);
                prevDiv.appendChild(updateBtn);
                prevDiv.appendChild(prevId);

                prevDataDiv.appendChild(prevDiv);
            }
        })
};

// function to delete specific data entry
function deleteData(id) {
    url = 'http://localhost:3000/api/data/' + id;
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
    })
        .then((resp) => {
            getAll();
        })
}


// function to create dynamic "update-form"
function updateData(title, desc, id) {

    if (document.contains(document.getElementById('newForm'))){
        document.getElementById('newForm').remove();
    } 
    
    //selecting elements
    let clientBody = document.querySelector('body');

    //creating elements
    let updateDiv = document.createElement('div')
    let updateForm = document.createElement('form');
    let titleP = document.createElement('p');
    let descP = document.createElement('p');

    let formSaveBtn = document.createElement('button');

    // styles and attributes

    updateForm.setAttribute('class', 'newForm')
    updateForm.setAttribute('id', 'newForm')
    formSaveBtn.setAttribute('onclick', `putFunction('${id}')`);
    formSaveBtn.setAttribute('type', 'button');

    // updateForm.style.backgroundColor = 'pink';
    // updateForm.style.width = '300px';
    // updateForm.style.textAlign = 'center';
    // updateForm.style.margin = '0 auto';
    // updateForm.style.zIndex = '-1'
    // updateForm.style.position = 'relative'

    // clientBody.style.filter = 'blur(3px)';


    formSaveBtn.innerText = "Save";
    formSaveBtn.style.display = 'block';
    // formSaveBtn.style.margin = '5px auto';
    // formSaveBtn.style.margin-bo = '5px auto';

    // nodes and appends
    let titlePNode = document.createTextNode('New title');
    let descPNode = document.createTextNode('New description');

    titleP.appendChild(titlePNode);
    descP.appendChild(descPNode);

    let titleInput = document.createElement('input');
    let descInput = document.createElement('input');
    let idInput = document.createElement('input');
    idInput.style.display = 'none';

    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'updateTitle');
    titleInput.setAttribute('id', 'updateTitle');
    titleInput.setAttribute('value', title);

    descInput.setAttribute('type', 'text');
    descInput.setAttribute('name', 'updateDesc');
    descInput.setAttribute('id', 'updateDesc');
    descInput.setAttribute('value', desc);

    idInput.setAttribute('type', 'text');
    idInput.setAttribute('name', 'updateId');
    idInput.setAttribute('id', 'updateId');
    idInput.setAttribute('value', id);

    updateForm.appendChild(titleP);
    updateForm.appendChild(titleInput);
    updateForm.appendChild(descP);
    updateForm.appendChild(descInput);
    updateForm.appendChild(formSaveBtn);
    updateForm.appendChild(idInput);

    updateDiv.appendChild(updateForm);
    clientBody.append(updateDiv);
}


function putFunction(id) {
    let updateTitleValue = document.getElementById('updateTitle').value;
    let updateDescValue = document.getElementById('updateDesc').value;
    let updateIdValue = document.getElementById('updateId').value;

    url = 'http://localhost:3000/api/data/' + id;
    console.log(url);
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({ updateTitleValue, updateDescValue, updateIdValue })
    })
        .then((resp) => {
            getAll();
        })
        document.getElementById('newForm').remove();
}