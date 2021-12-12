import axios from "axios";
import { useEffect, useState } from "react";
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
} from "../Assets/Icons/CreateTemplate";
import { Box } from "@mui/system";
import { ListStyle, TextFieldStyle, StyledBtns } from "./CVTemplateStyle";
import TemplateItem from "./TemplateItem";
import { GET_TEMPLATES } from "../../constants/requests";

function CvTemplateMain() {
  const [data, setData] = useState([]);
  const [tempName, setTempName] = useState("CV Template name");
  const [toggle, setToggle] = useState(true);

  const onAddSection = () => {};
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
        <object
          type="image/svg+xml"
          data={ListSVG}
          color="black"
          aria-labelledby="list"
        />
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
            <Box
              component="img"
              src={EditSVG}
              alt="edit"
              onClick={() => setToggle(false)}
            />
          </ListItem>
        ) : (
          <TextField
            sx={TextFieldStyle}
            fullWidth
            onBlur={() => setToggle(true)}
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            variant="standard"
          />
        )}
        {Object.keys(data).length ? (
          data.fields.map((item) => (
            <TemplateItem
              key={item.id}
              fieldName={item.name}
              metadata={item.metadata}
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
        <Box component="img" src={AddSection} onClick={onAddSection} />
        {false ? (
          <Box component="img" src={CreateCV} />
        ) : (
          <Box component="img" src={CreateCVDisabled} />
        )}
      </Box>
    </Container>
  );
}

export default CvTemplateMain;
