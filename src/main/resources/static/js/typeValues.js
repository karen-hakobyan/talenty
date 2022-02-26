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

    httpPost(BACKEND_URL + "/type_values/save", {type: type}, () => location.reload())
    updateTypeList()
    closeModal()
}

function addNewValue(index, value) {
    if (value.replaceAll(" ", "") === "") return;

    if (!value) {
        alert("Input valid type name")
        return;
    }

    if (!types_list[index].values) {
        types_list[index].values = []
    }

    for (let temp_value of types_list[index].values) {
        if (temp_value === value) {
            alert("Inputted value already exists")
            return;
        }
    }
    types_list[index].values.push(value)

    Loader.openWithDisabledScrolling()
    httpPost(BACKEND_URL + "/type_values/edit_values", {
        type: types_list[index].type,
        values: types_list[index].values
    }, () => {
        closeSmallerModal()
        closeModal()
        openEditModal(index)
        Loader.closeWithDisabledScrolling()
        // openEditModal(index)
    })

}

// Delete type
function requestForDeleteType(index) {
    if (!types_list[index]) {
        alert("No such type")
        return
    }

    openDeleteTypeModal(index)
}

//Delete value
function requestForDeleteValue(typeIndex, valueIndex) {
    if (valueIndex > -1) {
        types_list[typeIndex].values.splice(valueIndex, 1);
    }

    editValues(typeIndex, types_list[typeIndex].values)
}

function deleteType(typeIndex) {
    Loader.openWithDisabledScrolling()
    httpPost(BACKEND_URL + "/type_values/delete", {type: types_list[typeIndex].type}, () => location.reload())
}

function requestForEditValueName(typeIndex, valueIndex, newValueName) {
    let currentValue = types_list[typeIndex]?.values[valueIndex]
    if (currentValue === newValueName) {
        alert("same name!")
        return
    }
    types_list[typeIndex].values[valueIndex] = newValueName
    editValues(typeIndex, types_list[typeIndex].values)
    closeSmallerModalWithoutScrollingEnabling()
}

function requestForEditTypeName(typeIndex, newTypeName) {
    let currentTypeName = types_list[typeIndex].type;
    if (currentTypeName === newTypeName) {
        alert("same name!")
        return
    }
    editTypeName(currentTypeName, newTypeName)
}

function editValues(index, values) {
    httpPost(BACKEND_URL + "/type_values/edit_values", {
        type: types_list[index].type,
        values: values
    }, () => {
        closeModal()
        openEditModal(index)
    })
}

function editTypeName(oldTypeName, newTypeName) {
    httpPost(BACKEND_URL + "/type_values/edit_type", [
        {
            type: oldTypeName
        },
        {
            type: newTypeName
        }
    ], () => {
        location.reload()
    })
}