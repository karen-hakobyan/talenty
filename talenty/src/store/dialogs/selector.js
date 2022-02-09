const selectDialogIsOpen = (state) => state.dialogs.isOpen;
const selectDialogData = (state) => state.dialogs.data;
const selectDialogType = (state) => state.dialogs.dialogType;
const selectIsCompany = (state) => state.dialogs.isCompany;
const selectDialogInitialData = (state) => state.dialogs.initialData;

export {
  selectDialogIsOpen,
  selectDialogData,
  selectDialogType,
  selectIsCompany,
  selectDialogInitialData,
};
