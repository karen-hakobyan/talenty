(function ($) {
    "use strict";
    let mainApp = {
        main_fun: function () {
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });
        },
        initialization: function () {
            mainApp.main_fun();
        }
    }
    $(document).ready(function () {
        mainApp.main_fun();
    });
}(jQuery));

// Elements
let modal = document.getElementById("modal");
let modalContent = document.getElementById("modal_content");


// List
let types_list = []

updateTypeList()

function updateTypeList() {
    types_list = JSON.parse(httpGet("http://localhost:7800/type_values/get_all"))
    if (!types_list) {
        types_list = []
    }
    return types_list
}

// Value editing modal
function openEditModal(index) {
    modalContent.innerHTML = "<span class=\"close\" onclick=\"closeModal()\">&times;</span>"

    modalContent.innerHTML += "<button>Add new type</button></br>"
    modalContent.innerHTML += "</hr>"

    if (!types_list[index].values) {
        modalContent.innerHTML += "<p>No values</p>"
        showModal()
        return
    }

    for (let value of types_list[index].values) {
        console.log(value)
        modalContent.innerHTML += "<p>" + value + "</p>"
        modalContent.innerHTML += "<button>remove</button>"
        modalContent.innerHTML += "<hr/>"
    }
    showModal()
}

// Type adding modal
function openNewTypeModal() {
    modalContent.innerHTML = "<span class=\"close\" onclick=\"closeModal()\">&times;</span>"
    modalContent.innerHTML += "<input id='addNewTypeInput' type='text' placeholder='Input type name'>"
    modalContent.innerHTML += "<input type='button' value='Add' onclick='saveNewType(document.getElementById(`addNewTypeInput`).value)'>"
    showModal()
}

// Saving new type
function saveNewType(type) {
    type = type.replaceAll(" ", "")

    if (!type) {
        alert("Input valid type name")
        return;
    }

    for (let type_obj of types_list) {
        if (type_obj.type === type) {
            alert("Inputted type already exists")
            return;
        }
    }

    httpPost("http://localhost:7800/type_values/save", {type: type}, () => location.reload())
    updateTypeList()
    closeModal()
}

// Close current opened modal
function closeModal() {
    modal.style.display = "none";
    enableScroll()
}

// Open simple modal
function showModal() {
    modal.style.display = "block";
    disableScroll()
}


// GET request
function httpGet(url) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

// POST request
function httpPost(url, body, onReadyFunc) {
    let data = new FormData();
    for (let key of Object.keys(body)) {
        data.append(key, body[key])
    }

    console.log(body)
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", url, false);

    xmlHttp.setRequestHeader('Content-type', 'application/json');

    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            updateTypeList()
            onReadyFunc()
            return xmlHttp.responseText
        }
    }

    xmlHttp.send(JSON.stringify(body));
}

// Logout event
function logout() {
    console.log("123")
    alert("logout logic will be soon!")
}