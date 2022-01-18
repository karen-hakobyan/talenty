(function ($) {
    "use strict";
    var mainApp = {
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

function logout() {
    console.log("123")
    alert("logout logic will be soon!")
}

let modal = document.getElementById("modal");
let modalContent = document.getElementById("modal_content");

let types_list = httpGet("http://localhost:7800/admin/get_dropdown_lists")
types_list = JSON.parse(types_list)

function openEditModal(index) {
    console.log(index)
    console.log(types_list)

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

    modal.style.display = "block";
    disableScroll()
}

function closeModal() {
    modal.style.display = "none";
    enableScroll()
}

//for scrolling
let keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch (e) {
}

let wheelOpt = supportsPassive ? {passive: false} : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

function httpGet(theUrl) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}