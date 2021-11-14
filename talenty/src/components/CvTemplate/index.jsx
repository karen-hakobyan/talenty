import React, { useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "../Assets/Icons/deleteIcon.jsx";
import EditIcon from "../Assets/Icons/editIcon.jsx";
import EditSquareIcon from "../Assets/Icons/editSquareIcon.jsx";
import PaperIcon from "../Assets/Icons/paperIcon.jsx";
import PluseIcon from "../Assets/Icons/pluseIcon.jsx";
import TickSquareIcon from "../Assets/Icons/tickSquareIcon.jsx";
import CreateCvPopUpContainer from "./CreateCvPopUpContainer/CreateCvPopUpContainer.jsx";
import "./index.css";

function CvTemplate() {
  const [field, setField] = useState([]);
  const { systemTemplate } = useSelector((state) => state.main);

  return (
    <div className="template-wrapper">
      {field?.length !== 0 && <CreateCvPopUpContainer field={field} setField={setField} />}

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
      {systemTemplate.fields.map((item, index) => {
        return (
          <div className="cv-template-items" key={index} id={index}>
            <p>{item.name}</p>
            <div>
              <button
                id={index}
                className="edit-btn"
                onClick={(e) => {
                  setField(systemTemplate.fields[+e.target.id]);
                }}
              >
                <EditIcon /> Edit
              </button>
              <button
                id={index}
                className="delete-btn"
                disabled={!item.metadata.deletable}
                style={{ background: !item.metadata.deletable && "#EFEFEF", color: !item.metadata.deletable && "#9F9F9F" }}
              >
                <DeleteIcon deletable={!item.metadata.deletable + ""} /> Delete
              </button>
            </div>
          </div>
        );
      })}
      <div className="footer">
        <button className="add-btn">
          <PluseIcon /> <span>Add Sectio</span>n
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
