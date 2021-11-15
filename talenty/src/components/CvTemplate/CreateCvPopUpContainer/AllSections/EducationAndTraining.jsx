import React, { useState } from "react";
import CheckboxActiveIcon from "../../../Assets/Icons/CheckboxActiveIcon";
import CheckboxDefaultIcon from "../../../Assets/Icons/CheckboxDefaultIcon";
import DeleteIcon from "../../../Assets/Icons/deleteIcon";
import EditSquareIcon from "../../../Assets/Icons/editSquareIcon";
import PluseIcon from "../../../Assets/Icons/pluseIcon";
import TickSquareIcon from "../../../Assets/Icons/tickSquareIcon";

function EducationAndTraining({ field, setField }) {
  let [clickCheckbox, setClickCheckbox] = useState(true);

  return (
    <div id="pop-up-container" className="pop-up-container" onClick={(e) => e.target.id === "pop-up-container" && setField([])}>
      <div id="pop-up-wrapper" className="pop-up-wrapper" style={{ paddingBottom: "178px" }}>
        <div className="personal-info-name">
          <span>{field.name}</span>
          <EditSquareIcon />
        </div>
        {field.fields[0].fields.map((item, index) => {
          return (
            <div key={index} className="field-item">
              <span>{item.name}</span>
              <div className="item-footer">
                {["University/Organization", "Location", "Degree/Specialization", "Education details"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <input
                        placeholder={`${item.name} ${item.name === "University/Organization" ? " name" : ""} `}
                        className=" input"
                        type="text"
                        style={{ height: item.name === "Education details" && "118px" }}
                      />
                    </div>
                    <div className="checkbox-wrapper">
                      <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                        {clickCheckbox ? (
                          <div>
                            <CheckboxActiveIcon /> <span className="mandatory-text">Mandatory</span>
                          </div>
                        ) : (
                          <CheckboxDefaultIcon />
                        )}
                      </div>
                    </div>
                    <button id={item.name} className="delete-btn" style={{ position: "absolute", right: "24px" }}>
                      <DeleteIcon /> Delete
                    </button>
                  </div>
                )}
                {["From/to"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <div className="year-select">
                        <select name="Year" className="select" style={{ width: "202px" }}>
                          <option className="option" value="year">
                            From
                          </option>
                          {(() => {
                            let result = [];
                            for (let i = 1900; i <= +new Date().getFullYear(); i++) {
                              result.push(
                                <option className="option" value={i} key={i}>
                                  {i}
                                </option>
                              );
                            }
                            return result.reverse();
                          })()}
                        </select>
                        <select name="Year" className="select" style={{ width: "202px" }}>
                          <option className="option" value="year">
                            To
                          </option>
                          {(() => {
                            let result = [];
                            for (let i = 1900; i <= +new Date().getFullYear(); i++) {
                              result.push(
                                <option className="option" value={i} key={i}>
                                  {i}
                                </option>
                              );
                            }
                            return result.reverse();
                          })()}
                        </select>
                      </div>
                    </div>
                    <div className="checkbox-wrapper" style={{ position: "absolute", left: "469px" }}>
                      <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                        {clickCheckbox ? (
                          <div>
                            <CheckboxActiveIcon /> <span className="mandatory-text">Mandatory</span>
                          </div>
                        ) : (
                          <CheckboxDefaultIcon />
                        )}
                      </div>
                    </div>
                    <button id={item.name} className="delete-btn" style={{ position: "absolute", right: "24px" }}>
                      <DeleteIcon /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div className="footer">
          <button className="add-btn">
            <PluseIcon /> <span>Add Field</span>
          </button>
          <button className="create-btn">
            <TickSquareIcon />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EducationAndTraining;
