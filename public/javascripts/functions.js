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
            console.log(data[0].title);
            for (i = 0; i < data.length; i++) {
                console.log(data[i].title);

                let prevDataDiv = document.getElementById('prevData');

                let prevDiv = document.createElement('div');
                prevDiv.setAttribute('id', 'toDoCollection');
                let prevTitle = document.createElement('h3');
                let prevDesc = document.createElement('p');
                let delBtn = document.createElement('button');

                delBtn.setAttribute('onclick', `deleteData('${data[i].title}')`);
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

function deleteData(title) {
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