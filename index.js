let globalTaskData = [];
taskContents = document.getElementById("taskContentsrow");

const addCard = () => {
    const newTaskDetails = {
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        title: document.getElementById("animeTitle").value,
        genre: document.getElementById("animeGenre").value,
        score: document.getElementById("animeScore").value,
        review: document.getElementById("animeReview").value
    };

    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}

const generateTaskCard = ({id, url, title, genre,score, review}) => {
    return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
                        <i class="fas fa-pencil-alt" name=${id} onclick="editTask(this)"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
                        <i class="far fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
                    </button>
                </div>
            </div>
            <img src=${url} class="card-img-top" alt="image"/>
            <div class="card-body">
                <h2  style="margin-bottom: 1px solid black";>${title}</h2>
                <h5 class="badge badge-pill bg-dark bg-opacity-75">${genre}</h5><br>
                <h6 class="fa fa-star checked"> ${score}</h6>
                <p class="card-text">${review}</p> 
            </div>
            <div class="card-footer">
                <button class="btn btn-outline-primary float-end">Open Review</button>
            </div>
        </div>
    </div>`)
}

const saveToLocalStorage = () => {
    localStorage.setItem("tasky", JSON.stringify({REVIEWS: globalTaskData}));
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));
    console.log(localStorageCopy);
    if(localStorageCopy) {
        globalTaskData = localStorageCopy["REVIEWS"];
    }
    console.log(globalTaskData)
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
    })
}

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}


const editTask = (e) => {
    const targetID = e.getAttribute("name");
    console.log(e)
    console.log(e.parentNode)
    console.log(e.parentNode.parentNode.parentNode.childNodes)
    console.log(e.parentNode.parentNode.parentNode.childNodes[3])
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1])
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3])
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[6])
    console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[8])

    e.parentNode.parentNode.parentNode.childNodes[3].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[6].setAttribute("contenteditable", "true")
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[8].setAttribute("contenteditable", "true")
    

    
    console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1])
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("border", "1px solid blue")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].style.setProperty("background", "navyblue")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "saveEditTask(this)")
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
}






const saveEditTask = (e) => {
    const targetID = e.getAttribute("name");
    const newTaskDetails = {
        id: e.parentNode.parentNode.parentNode.getAttribute("id"),
        url: e.parentNode.parentNode.childNodes[3].getAttribute("name"),
        title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
        genre: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML,
        score: e.parentNode.parentNode.childNodes[5].childNodes[6].innerHTML,
        review: e.parentNode.parentNode.childNodes[5].childNodes[8].innerHTML
    }
    const refid = e.parentNode.parentNode.parentNode.getAttribute("id")
    console.log(refid)
    objIndex = globalTaskData.findIndex((obj => obj.id == refid ));
    console.log(objIndex)
    globalTaskData[objIndex] = newTaskDetails
    
    saveToLocalStorage()
    window.location.reload();
}