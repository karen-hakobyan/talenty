import { Dialog } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectDialogData,
  selectDialogIsOpen,
} from "../../store/dialogs/selector";
import Body from "./Body";

export default function Dialogs() {
  const isDialogOpen = useSelector(selectDialogIsOpen);
  const dialogData = useSelector(selectDialogData);
  const [attentionIsOpen, setAttentionIsOpen] = useState(false);

  if (!isDialogOpen) {
    attentionIsOpen && setAttentionIsOpen(false);
    return null;
  }

  return (
    <Dialog
      open={true}
      onClose={() => {
        setAttentionIsOpen(true);
      }}
      maxWidth={false}
      sx={{ borderRadius: "16px" }}
    >
      <Body
        dialogData={dialogData}
        {...{
          attentionIsOpen,
          setAttentionIsOpen,
        }}
      />
    </Dialog>
  );
}
