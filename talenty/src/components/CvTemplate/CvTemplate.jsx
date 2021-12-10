import React, { useState } from "react";
import { styled } from "@mui/system";

import EditIcon from "../Assets/Icons/editIcon.js";
import PaperIcon from "../Assets/Icons/paperIcon.jsx";
import PluseIcon from "../Assets/Icons/pluseIcon.jsx";
import TickSquareIcon from "../Assets/Icons/tickSquareIcon.js";
import Container from "@mui/material/Container";
import { Gray90, Magnet, Pink } from "../../colors/colors.js";
import CvSections from "./CvSections.jsx";

const BackgroundColor = styled("div")({
  backgroundColor: Gray90,
});
const CreateCVTamlateContainer = styled("div")({
  paddingTop: 32,
  paddingBottom: 44,
  display: "flex",
  alignItems: "center",
  justifyContent: "stretch",
});
const PaperIcons = styled(PaperIcon)({
  marginRight: 16.2,
});
const CvTitle = styled("span")(({ theme }) => ({
  color: Pink,
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "20px",
}));
const CvName = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingBottom: 22,
}));
const CvNameTitle = styled("div")(({ theme }) => ({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "18px",
  height: 30,
  color: Magnet,
}));
const CvNameInput = styled("input")(({ theme }) => ({
  border: "none",
  padding: 0,
  margin: 0,
  backgroundColor: Gray90,
  outline: "none",
  height: 19,
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "18px",
  height: 30,
  color: Magnet,
  width: "100%",
}));

const Border = styled("div")({
  width: "100%",
  border: "1px solid #D2D2D2",
  marginBottom: 42,
});

const Edite = styled(EditIcon)({
  cursor: "pointer",
});

const item = [
  { title: "Personal Info", spanText: undefined, disabled: true },
  { title: "Education and Training", spanText: "(Edited)", disabled: false },
  { title: "Work Experience", spanText: "(Edited)", disabled: false },
  { title: "Professional skills", spanText: undefined, disabled: false },
  { title: "Personal skills ", spanText: undefined, disabled: false },
  { title: "Languages", spanText: undefined, disabled: false },
  { title: "Summary", spanText: undefined, disabled: false },
  { title: "Interests and Hobbies", spanText: undefined, disabled: false },
  { title: "Projects/Products", spanText: undefined, disabled: false },
  { title: "Publications", spanText: undefined, disabled: false },
  { title: "Additional information", spanText: undefined, disabled: false },
];

function CvTemplate() {
  // const [editeCvName, setEditeCvName] = useState(true);
  // const [editeName, setEditeName] = useState("CV Template Name");
  // const changeName = (event) => setEditeName(event.target.value);
  // const renderCvSectionItem = (item) => <CvSections item={item} />;
  // return (
  //   <>
  //     <BackgroundColor>
  //       <Container maxWidth="lg">
  //         <CreateCVTamlateContainer>
  //           <PaperIcons />
  //           <CvTitle>Create CV Template</CvTitle>
  //         </CreateCVTamlateContainer>
  //         <CvName>
  //           {editeCvName === false ? (
  //             <CvNameTitle>{editeName}</CvNameTitle>
  //           ) : (
  //             <CvNameInput
  //               type="text"
  //               value={editeName}
  //               onChange={changeName}
  //             />
  //           )}
  //           <TickSquareIcon />
  //           <Edite onClick={() => setEditeCvName(!editeCvName)} />
  //         </CvName>
  //         <Border />
  //         <div>{item.map((item) => renderCvSectionItem(item))}</div>
  //       </Container>
  //     </BackgroundColor>
  //   </>
  // );
}

export default CvTemplate;
