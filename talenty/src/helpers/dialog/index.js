import {setDialogData} from "../../store/dialogs/slice";

const deleteMapper = (name) => (el) => {
    if (el.name === name) {
        return {
            ...el,
            metadata: {...el.metadata, status: "DELETED"},
        };
    }
    return el;
};

const deleteFilterer = (name) => (el) => el.name !== name

const editMapper = (initialName) => (field) => {
    const {name, metadata} = field;
    if (name === initialName) {
        return {
            ...field,
            metadata: {...metadata, required: !metadata.required},
        };
    }
    return field;
};

export function onDelete({dispatch, item, dialogData, isSectionContainer}) {
    const updatedDialogData = isSectionContainer
        ? {
            ...dialogData,
            fields: [
                {
                    ...dialogData.fields[0],
                    fields: item.id ? dialogData.fields[0].fields.map(deleteMapper(item.name)) : dialogData.fields[0].fields.filter(deleteFilterer(item.name)),
                },
            ],
        }
        : {
            ...dialogData,
            fields: item.id ? dialogData.fields.map(deleteMapper(item.name)) : dialogData.fields.filter(deleteFilterer(item.name)),
        };
    dispatch(setDialogData(updatedDialogData));
}

export function isDisabled({templateData, value}) {
    const result =
        templateData.fields[0]?.metadata.type === "section_container"
            ? templateData.fields[0]
            : templateData;
    return result.fields.some((el) => el.name === value) || value.length === 0;
}

export function editOtherCheckbox({dispatch, dialogData, id}) {
    let updatedDialogData = JSON.stringify(dialogData)
    updatedDialogData = JSON.parse(updatedDialogData, (key, reviverValue) => {
        if(!reviverValue?.id || reviverValue.id !== id) {
            return reviverValue
        }
        return {
            ...reviverValue,
            metadata: {
                ...reviverValue.metadata,
                required: !reviverValue.metadata.required
            }
        }
    })
    dispatch(setDialogData(updatedDialogData))
}

export function deleteOtherAction({dispatch, dialogData, id}) {
    let updatedDialogData = JSON.stringify(dialogData)
    updatedDialogData = JSON.parse(updatedDialogData, (key, reviverValue) => {
        if(!reviverValue?.id || reviverValue.id !== id) {
            return reviverValue
        }
        return {
            ...reviverValue,
            metadata: {...reviverValue.metadata, status: "DELETED"}
        }
    })
    dispatch(setDialogData(updatedDialogData))
}

export function editCheckboxState({
                                      dispatch,
                                      dialogData,
                                      name: initialName,
                                      isSectionContainer,
                                  }) {
    const updatedDialogData = isSectionContainer
        ? {
            ...dialogData,
            fields: [
                {
                    ...dialogData.fields[0],
                    fields: dialogData.fields[0].fields.map(editMapper(initialName)),
                },
            ],
        }
        : {
            ...dialogData,
            fields: dialogData.fields.map(editMapper(initialName)),
        };
    dispatch(setDialogData(updatedDialogData));
}

export function editLinkCheckboxState({dialogData, id, dispatch}) {
    const dialogDataJSON = JSON.stringify({...dialogData});

    const updatedDialogData = JSON.parse(dialogDataJSON, (key, value) => {
        if (value.id === id) {
            return {
                ...value,
                metadata: {...value.metadata, required: !value.metadata.required},
            };
        } else {
            return value;
        }
    });
    dispatch(setDialogData(updatedDialogData));
}
