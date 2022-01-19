import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { PINK } from "../../constants/colors";
import {
  AddSectionIconSVG,
  ListSVG,
  EditSVG,
  CreateCV,
  CreateCVDisabled,
} from "../../assets/icons/createTemplate";
import { Box } from "@mui/system";
import { ListStyle, TextFieldStyle, StyledBtns } from "./CVTemplateStyle";
import TemplateItem from "./TemplateItem";
import { GET_TEMPLATES } from "../../constants/requests";
import hrExData from "../../helpers/ajabsandal";

function CvTemplateMain() {
  const [data, setData] = useState(null);
  const [tempName, setTempName] = useState("CV Template name");
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    axios
      .get(GET_TEMPLATES)
      .then((res) => {
        console.log(res);
        const { data } = res;
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        setData(hrExData);
      });
  }, []);

  if (!data) {
    return null;
  }
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
            <TemplateItem key={item._id} item={item} setData={setData} />
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
        <IconButton
          sx={{
            display: "flex",
            width: "179px",
            height: "34px",
            justifyContent: "center",
            alignItems: "center",
            gap: "9px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ECECEC",
          }}
        >
          <AddSectionIconSVG />
          Add section
        </IconButton>
        {true ? (
          <IconButton>
            <CreateCV />
          </IconButton>
        ) : (
          <CreateCVDisabled />
        )}
      </Box>
    </Container>
  );
}

export default CvTemplateMain;
