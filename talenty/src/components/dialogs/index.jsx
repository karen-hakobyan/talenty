import { Dialog } from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDialogData,
  selectDialogIsOpen,
  selectDialogType,
} from "../../store/dialogs/selector";
import { setDialogIsOpen } from "../../store/dialogs/slice";
import { dialogTypes } from "./type";

export default function Dialogs() {
  const dispatch = useDispatch();
  const dialogType = useSelector(selectDialogType);
  const isDialogOpen = useSelector(selectDialogIsOpen);
  const dialogData = useSelector(selectDialogData);
  const [attentionIsOpen, setAttentionIsOpen] = useState(false);

  const tempComponentInfo = useMemo(() => {
    return dialogType
      ? dialogTypes[dialogType]({
          dialogData,
          setAttentionIsOpen,
          attentionIsOpen,
        })
      : { component: () => {} };
  }, [dialogType, attentionIsOpen, dialogData]);

  const TempComponent = useMemo(() => {
    return tempComponentInfo.component;
  }, [tempComponentInfo]);

  if (!isDialogOpen) {
    attentionIsOpen && setAttentionIsOpen(false);
    return null;
  }
  if (!dialogType) {
    return null;
  }

  // const TempComponent = dialogTypes[dialogType];

  return (
    <Dialog
      open={true}
      onClose={
        dialogType === "body"
          ? () => {
              setAttentionIsOpen(true);
            }
          : () => dispatch(setDialogIsOpen(false))
      }
      maxWidth={false}
      sx={{ borderRadius: "16px" }}
    >
      <TempComponent {...tempComponentInfo.props} />
    </Dialog>
  );
}
