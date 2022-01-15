const selectDialogIsOpen = (state) => state.dialogs.isOpen;
const selectDialogData = (state) => state.dialogs.data;

export { selectDialogIsOpen, selectDialogData };