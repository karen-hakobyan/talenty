import { setDialogData } from "../../store/dialogs/slice";

export function onDelete({ dispatch, name, dialogData }) {
    const updatedDialogData = {
        ...dialogData,
        fields: dialogData.fields.map((el) => {
            if(el.name === name) {
                return {
                    ...el,
                    metadata: {...el.metadata, status: 'deleted'},
                    // status could be changed
                }
            }
            return el
        }),
    };
    dispatch(setDialogData(updatedDialogData));
}
export function isDisabled({ templateData, value }) {
    return (
        templateData.fields.some((el) => el.name === value) || value.length === 0
    );
}

export function editCheckboxState({ dispatch, dialogData, name: initialName }) {
    const updatedDialogData = {
        ...dialogData,
        fields: dialogData.fields.map((field) => {
            const { name, metadata } = field;
            if (name === initialName) {
                return {
                    ...field,
                    metadata: {...metadata, required: !metadata.required },
                };
            }
            return field;
        }),
    };
    dispatch(setDialogData(updatedDialogData));
}

export function editCheckboxLink({ dialogData, id, dispatch }) {
    const dialogDataJSON = JSON.stringify({...dialogData });

    const updatedDialogData = JSON.parse(dialogDataJSON, (key, value) => {
        if (value.id === id) {
            return {
                ...value,
                metadata: {...value.metadata, required: !value.metadata.required },
            };
        } else {
            return value;
        }
    });
    dispatch(setDialogData(updatedDialogData));
}