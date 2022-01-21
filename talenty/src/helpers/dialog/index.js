import { setDialogData } from "../../store/dialogs/slice";

export function onDelete({ dispatch, id, dialogData }) {
    const updatedDialogData = {
        ...dialogData,
        fields: dialogData.fields.filter((el) => el.id !== id),
    };
    dispatch(setDialogData(updatedDialogData));
}