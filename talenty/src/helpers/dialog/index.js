import { setDialogData } from "../../store/dialogs/slice";

export function onDelete({ dispatch, name, dialogData }) {
    const updatedDialogData = {
        ...dialogData,
        fields: dialogData.fields.filter((el) => el.name !== name),
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
            console.log(name);
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