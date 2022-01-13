import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { PINK } from "../../constants/colors";
import {
  ListSVG,
  EditSVG,
  AddSection,
  CreateCV,
  CreateCVDisabled,
} from "../../assets/icons/createTemplate";
import { Box } from "@mui/system";
import { ListStyle, TextFieldStyle, StyledBtns } from "./CVTemplateStyle";
import TemplateItem from "./TemplateItem";
import { GET_TEMPLATES } from "../../constants/requests";
import PersonalInfo from "../Dialogs/PersonalInfo";

function CvTemplateMain() {
  const [data, setData] = useState({});
  const [tempName, setTempName] = useState("CV Template name");
  const [toggle, setToggle] = useState(true);
  const [activeData, setActiveData] = useState(null);

  const onAddSection = () => {};
  const onDialogOpen = useCallback(
    (editedItem) => setActiveData(editedItem),
    []
  );
  useEffect(() => {
    axios
      .get(GET_TEMPLATES)
      .then((res) => {
        const { data } = res;
        setData(data);
      })
      .catch((err) => new Error(err));
  }, []);
  return (
    <Container>
      <Box sx={{ display: "flex", mt: 5 }}>
        <ListSVG />
        <Typography
          sx={{
            fontWeight: 600,
            color: PINK,
            fontFamily: "Proxima Nova",
            fontSize: "20px",
          }}
          variant="h5"
        >
          Create CV Template
        </Typography>
      </Box>
      <List sx={ListStyle} component="nav" aria-label="templates">
        {toggle ? (
          <ListItem sx={{ pl: 0, pb: 0 }} button divider>
            <ListItemText
              onClick={() => setToggle(false)}
              primary={tempName}
              sx={{ cursor: "text" }}
              onChange={(e) => setTempName(e.target.value)}
            />
            <EditSVG />
          </ListItem>
        ) : (
          <TextField
            sx={TextFieldStyle}
            fullWidth
            onBlur={() => tempName && setToggle(true)}
            error={true}
            helperText={!tempName && "You should have name for the Template"}
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            variant="standard"
          />
        )}
        {Object.keys(data).length ? (
          data.fields.map((item) => (
            <TemplateItem
              key={item.id}
              item={item}
              onDialogOpen={onDialogOpen}
            />
          ))
        ) : (
          <>
            <Skeleton sx={{ mt: 3 }} animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
        )}
      </List>
      <Box sx={StyledBtns}>
        <AddSection onClick={onAddSection} />
        {true ? (
          <CreateCV />
        ) : (
          <CreateCVDisabled />
        )}
      </Box>
      {!!activeData && activeData.id === "61b0ec57f859615fcace5470" && (
        <PersonalInfo data={activeData} onDialogOpen={onDialogOpen} />
      )}
    </Container>
  );
}

export default CvTemplateMain;
