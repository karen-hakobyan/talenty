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
let types_list = JSON.parse(httpGet("http://localhost:7800/admin/get_dropdown_lists"))
if(!types_list) {
    types_list = {}
}

function openEditModal(index) {
    if (!types_list[index]) return

    modalContent.innerHTML = "<span class=\"close\" onclick=\"closeModal()\">&times;</span>"

    modalContent.innerHTML += "<button>Add new type</button></br>"
    modalContent.innerHTML += "</hr>"

    for (let value of types_list[index].values) {
        console.log(value)
        modalContent.innerHTML += "<p>" + value + "</p>"
        modalContent.innerHTML += "<button>remove</button>"
        modalContent.innerHTML += "<hr/>"
    }

    showModal()
}

function openNewTypeModal() {
    modalContent.innerHTML = "<span class=\"close\" onclick=\"closeModal()\">&times;</span>"
    modalContent.innerHTML += "<input type='text' placeholder='Input type name'>"
    modalContent.innerHTML += "<input type='button' onclick='saveNewType()'>"
    showModal()
}

function saveNewType() {
    httpPost("http://localhost:7800/type_values/save", {type: "test2"})
    closeModal()
}

function closeModal() {
    modal.style.display = "none";
    enableScroll()
}

function showModal() {
    modal.style.display = "block";
    disableScroll()
}

function httpGet(url) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function httpPost(url, body) {
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
            console.log(xmlHttp.responseText)
            return xmlHttp.responseText
        }
    }

    xmlHttp.send(JSON.stringify(body));
}

function logout() {
    console.log("123")
    alert("logout logic will be soon!")
}