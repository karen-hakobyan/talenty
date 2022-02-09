import { setDialogData } from "../../store/dialogs/slice";

const deleteMapper = (name) => (el) => {
  if (el.name === name) {
    return {
      ...el,
      metadata: { ...el.metadata, status: "deleted" },
      // status could be changed
    };
  }
  return el;
};

const editMapper = (initialName) => (field) => {
  const { name, metadata } = field;
  if (name === initialName) {
    return {
      ...field,
      metadata: { ...metadata, required: !metadata.required },
    };
  }
  return field;
};

export function onDelete({ dispatch, name, dialogData, isSectionContainer }) {
  // console.log(dialogData);
  const updatedDialogData = isSectionContainer
    ? {
        ...dialogData,
        fields: [
          {
            ...dialogData.fields[0],
            fields: dialogData.fields[0].fields.map(deleteMapper(name)),
          },
        ],
      }
    : {
        ...dialogData,
        fields: dialogData.fields.map(deleteMapper(name)),
      };
  dispatch(setDialogData(updatedDialogData));
}
export function isDisabled({ templateData, value }) {
  return (
    templateData.fields.some((el) => el.name === value) || value.length === 0
  );
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

export function editCheckboxLink({ dialogData, id, dispatch }) {
  const dialogDataJSON = JSON.stringify({ ...dialogData });

  const updatedDialogData = JSON.parse(dialogDataJSON, (key, value) => {
    if (value.id === id) {
      return {
        ...value,
        metadata: { ...value.metadata, required: !value.metadata.required },
      };
    } else {
      return value;
    }
  });
  dispatch(setDialogData(updatedDialogData));
}
