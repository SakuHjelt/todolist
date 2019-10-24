// getting all previous data entries
getAll();

document.getElementById("addButton").addEventListener("click", postNew);

function postNew() {
    event.preventDefault();

    let title = document.getElementById('todoTitle').value;
    let desc = document.getElementById('todoDescription').value;
    let items = {title: title, desc: desc}
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

function getAll() {
    url = 'http://localhost:3000/api/data'
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            document.getElementById('prevData').innerHTML="";
            // console.log(data[0].title);
            for (i = 0; i < data.length; i++) {
                console.log(data[i].title);

                let prevDataDiv = document.getElementById('prevData');

                let prevDiv = document.createElement('div');
                prevDiv.setAttribute('id', 'toDoCollection');

                let prevTitle = document.createElement('h3');
                let prevDesc = document.createElement('p');
                let prevId = document.createElement('p');
                prevId.style.display = 'none';

                let delBtn = document.createElement('button');
                let updateBtn = document.createElement('button');

                delBtn.setAttribute('onclick', `deleteData('${data[i].title}')`);
                delBtn.innerText = "Delete"
                updateBtn.setAttribute('onclick', `updateData('${data[i].title}','${data[i].desc}','${data[i].id}')`);
                updateBtn.innerText = "Update"
                

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

function deleteData(title, desc) {
    console.log("delete:")
    console.log(title);
    let key = document.querySelector('h3').textContent;
    console.log('avain on ' + key);
    console.log('Click');
    url = 'http://localhost:3000/api/data/'+title;
    fetch(url, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        // body: JSON.stringify()
    })
    .then((resp) => {
        getAll();
    })
    }



function updateData (title, desc, id){

    console.log('tuleeko mukana vielä ' + title + desc + id);
    let clientBody = document.querySelector('body');

    let updateDiv = document.createElement('div')
    let updateForm = document.createElement('form');
    updateForm.setAttribute('class', 'new-form')
    updateForm.style.backgroundColor = 'pink';
    updateForm.style.width = '300px';
    updateForm.style.textAlign = 'center';

    let titleP = document.createElement('p');
    let descP = document.createElement('p');

    let formSaveBtn = document.createElement('button');
    formSaveBtn.setAttribute('onclick', `putFunction('${title}')`);
    formSaveBtn.setAttribute('type', 'button');

    formSaveBtn.innerText = "save";
    formSaveBtn.style.display = 'block';
    formSaveBtn.style.margin = '0 auto';

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
    clientBody.appendChild(updateDiv);
}

function putFunction(title){
    console.log("tuleeko title" + title);
    let updateTitleValue = document.getElementById('updateTitle').value;
    let updateDescValue = document.getElementById('updateDesc').value;
    let updateIdValue = document.getElementById('updateId').value;

    console.log(updateTitleValue + updateDescValue);

    url = 'http://localhost:3000/api/data/' + title;
    console.log(url);
    fetch(url, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({updateTitleValue, updateDescValue, updateIdValue})
    })
    .then((resp) => {
        getAll();
    })
    }