export default function isDialogDataInitial(dialogData, initialData) {
  return JSON.stringify(dialogData) === JSON.stringify(initialData);
}
