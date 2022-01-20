// Elements
let modal = document.getElementById("modal");
let modalContent = document.getElementById("modal_content");

// Value editing modal
function openEditModal(index) {
    modalContent.innerHTML = "<span class=\"close\" onclick=\"closeModal()\">&times;</span>"

    modalContent.innerHTML += "<button onclick='editValues()'>Add new type</button></br>"
    modalContent.innerHTML += "</hr>"

    if (!types_list[index].values) {
        modalContent.innerHTML += "<p>No values</p>"
        showModal()
        return
    }

    for (let value of types_list[index].values) {
        console.log(value)
        modalContent.innerHTML += "<p>" + value + "</p>"
        modalContent.innerHTML += "<button>edit</button>"
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

// Delete type confirm modal
function openDeleteTypeModal(index) {
    modalContent.innerHTML = "<h2>Delete " + types_list[index].type + " ?</h2>"
    modalContent.innerHTML +=
        "<div> " +
        "<button onclick='deleteType(" + index + ")'>Delete</button> " +
        "<button onclick='closeModal()'>Cancel</button>" +
        " </div>"

    showModal()
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