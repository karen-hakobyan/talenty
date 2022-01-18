import { Dialog } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDialogData,
  selectDialogIsOpen,
} from "../../store/dialogs/selector";
import { setDialogIsOpen } from "../../store/dialogs/slice";
import Body from "./Body";

export default function Dialogs() {
  const isDialogOpen = useSelector(selectDialogIsOpen);
  const dialogData = useSelector(selectDialogData);
  const dispatch = useDispatch(setDialogIsOpen(false));

  useEffect(() => {
    console.log(dialogData);
  }, [dialogData]);

  if (!isDialogOpen) {
    return null;
  }

  return (
    <Dialog
      open={true}
      onClose={() => {
        dispatch(setDialogIsOpen(false));
      }}
      maxWidth={false}
      sx={{ borderRadius: "16px" }}
    >
      <Body dialogData={dialogData} />
    </Dialog>
  );
}
