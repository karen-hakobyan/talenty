import React from "react";

import EducationAndTraining from "./AllSections/EducationAndTraining";
import PersonalInfoSection from "./AllSections/PersonalInfoSection";

import "./index.css";

function CreateCvPopUpContainer({ field, setField }) {
  console.log(field, "fielddddddddddddddd");

  switch (field.name) {
    case "Personal Info":
      return <PersonalInfoSection field={field} setField={setField} />;
    case "Education and Training":
      return <EducationAndTraining field={field} setField={setField} />;
    default:
      return (
        <div id="pop-up-container" className="pop-up-container" onClick={(e) => e.target.id === "pop-up-container" && setField([])}>
          <div id="pop-up-wrapper" className="pop-up-wrapper">
            <h1>Invalid Value !!! sorry</h1>
          </div>
        </div>
      );
  }
}

export default CreateCvPopUpContainer;
