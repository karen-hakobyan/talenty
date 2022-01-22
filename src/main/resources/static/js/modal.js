// Elements
let modal = document.getElementById("modal");
let modalContent = document.getElementById("modal_content");

let smallerModal = document.getElementById("smaller_modal");
let smallerModalContent = document.getElementById("smaller_modal_content");

function openNewValueModal(index) {
    smallerModalContent.innerHTML = "<span class=\"close\" onclick=\"closeSmallerModalWithoutScrollingEnabling()\">&times;</span>"
    smallerModalContent.innerHTML += "<input id='addNewValueInput' type='text' placeholder='Input type name'>"
    smallerModalContent.innerHTML += "<input type='button' value='Add' onclick='addNewValue(" + index + ", document.getElementById(`addNewValueInput`).value)'>"
    showSmallerModal()
}

function openEditTypeName(typeIndex) {
    smallerModalContent.innerHTML = "<span class=\"close\" onclick=\"closeSmallerModalWithoutScrollingEnabling()\">&times;</span>"
    smallerModalContent.innerHTML += `<input id='editValueNameInput' value="${types_list[typeIndex]?.type}" type='text' placeholder='Input type name'>`
    smallerModalContent.innerHTML += "<input type='button' value='Save' " +
        "onclick='requestForEditTypeName(" +
        "" +typeIndex + "," +
        " document.getElementById(`editValueNameInput`).value)'>"
    showSmallerModal()
}

// Value editing modal
function openEditModal(index) {
    modalContent.innerHTML = "<span class=\"close\" onclick=\"closeModal()\">&times;</span>"
    modalContent.innerHTML += "<button onclick='openNewValueModal(" + index + ")'>Add new type</button></br>"
    modalContent.innerHTML += "</hr>"

    if (!types_list[index].values) {
        modalContent.innerHTML += "<p>No values</p>"
        showModal()
        return
    }

    for (let i = 0; i < types_list[index].values.length; i++) {
        let value = types_list[index].values[i]
        modalContent.innerHTML += "<p>" + value + "</p>"
        modalContent.innerHTML += "<button onclick='openValueEditModal(" + index + ", " + i + ")'>Edit</button>"
        modalContent.innerHTML += "<button onclick='requestForDeleteValue(" + index + ", " + i + ")'>Delete</button>"
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

//Show value edit modal
function openValueEditModal(typeIndex, valueIndex) {
    smallerModalContent.innerHTML = "<span class=\"close\" onclick=\"closeSmallerModalWithoutScrollingEnabling()\">&times;</span>"
    smallerModalContent.innerHTML += `<input id='editValueNameInput' value="${types_list[typeIndex]?.values[valueIndex]}" type='text' placeholder='Input type name'>`
    smallerModalContent.innerHTML += "<input type='button' value='Save' " +
        "onclick='requestForEditValueName(" +
        "" +typeIndex + "," +
        " " + valueIndex + "," +
        " document.getElementById(`editValueNameInput`).value)'>"
    showSmallerModal()
}

// Open simple modal
function showSmallerModal() {
    smallerModal.style.display = "block";
    disableScroll()
}

// Close current opened modal
function closeSmallerModal() {
    smallerModal.style.display = "none";
    enableScroll()
}

// Close current opened modal without disabling scrolling
function closeSmallerModalWithoutScrollingEnabling() {
    smallerModal.style.display = "none";
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