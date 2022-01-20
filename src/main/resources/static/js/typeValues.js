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

// Delete type
function requestForDeleteType(index) {
    if (!types_list[index]) {
        alert("No such type")
        return
    }

    openDeleteTypeModal(index)
}

function deleteType(index) {
    httpPost("http://localhost:7800/type_values/delete", {type: types_list[index].type}, () => location.reload())
}

function editValues() {
    httpPost("http://localhost:7800/type_values/edit_values", {
        type: 'gender',
        values: ['MALE', 'Female']
    }, () => location.reload())
}