import React from "react";
import DeleteIcon from "../Assets/Icons/deleteIcon.jsx";
import EditIcon from "../Assets/Icons/editIcon.jsx";
import EditSquareIcon from "../Assets/Icons/editSquareIcon.jsx";
import PaperIcon from "../Assets/Icons/paperIcon.jsx";
import PluseIcon from "../Assets/Icons/pluseIcon.jsx";
import TickSquareIcon from "../Assets/Icons/tickSquareIcon.jsx";
import "./index.css";

const createCvTemplateItems = [
  "Personal Info",
  "Education and Training",
  "Work Experience",
  "Professional skills",
  "Personal skills",
  "Languages",
  "Summary",
  "Interests and Hobbies",
  "Projects/Products",
  "Publications",
  "Additional information ",
];

function CvTemplate() {
  return (
    <div className="template-wrapper">
      <div className="cv-template-title">
        <PaperIcon />
        <span> Create CV Template</span>
      </div>
      <div className="cv-template-name">
        <p>CV Template Name</p>
        <div>
          <EditSquareIcon />
        </div>
      </div>
      {createCvTemplateItems.map((item) => {
        return (
          <div className="cv-template-items">
            <p>{item}</p>
            <div>
              <button className="edit-btn">
                <EditIcon /> Edit
              </button>
              <button className="delete-btn">
                <DeleteIcon /> Delete
              </button>
            </div>
          </div>
        );
      })}
      <div className="footer">
        <button className="add-btn">
          <PluseIcon /> <span>Add Section</span>n
        </button>
        <button className="create-btn">
          <TickSquareIcon />
          <span>Create CV</span>
        </button>
      </div>
    </div>
  );
}

export default CvTemplate;
