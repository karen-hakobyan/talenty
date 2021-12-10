import React from "react";
import { styled } from "@mui/system";
import DeleteIcon from "../Assets/Icons/deleteIcon.jsx";
import EditSquareIcon from "../Assets/Icons/editSquareIcon.jsx";
import { Magnet } from "../../colors/colors.js";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
  marginTop: 36,
}));

const H5 = styled("h3")(({ theme }) => ({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "18px",
  lineHeight: "22px",
  color: Magnet,
}));
const Span = styled("span")(({ theme }) => ({
  opacity: 0.5,
  fontSize: "14px",

  marginLeft: 10,
}));

function CvSections(props) {
  const item = props.item;

  return (
    <>
      {/* <Container>
        <H5>
          {item.title}
          {item.spanText !== undefined ? <Span>{item.spanText}</Span> : null}
        </H5>
        <div>
          <button>
            <EditSquareIcon />
            <span>Edit</span>
          </button>
          <button disabled={item.disabled}>
            <DeleteIcon />
            <span>Delete</span>
          </button>
        </div>
      </Container> */}
    </>
  );
}

export default CvSections;
