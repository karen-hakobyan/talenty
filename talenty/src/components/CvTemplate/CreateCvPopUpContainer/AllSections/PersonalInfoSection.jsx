import React, { useState } from "react";
import CheckboxActiveIcon from "../../../Assets/Icons/CheckboxActiveIcon";
import CheckboxDefaultIcon from "../../../Assets/Icons/CheckboxDefaultIcon";
import CheckboxDisabledIcon from "../../../Assets/Icons/CheckboxDisabledIcon";
import DeleteIcon from "../../../Assets/Icons/deleteIcon";
import EditSquareIcon from "../../../Assets/Icons/editSquareIcon";
import PluseIcon from "../../../Assets/Icons/pluseIcon";
import BehanceIcon from "../../../Assets/Icons/SocialMediaIcons/BehanceIcon";
import DribbbleIcon from "../../../Assets/Icons/SocialMediaIcons/DribbbleIcon";
import FacebookIcon from "../../../Assets/Icons/SocialMediaIcons/FacebookIcon";
import GithubIcon from "../../../Assets/Icons/SocialMediaIcons/GithubIcon";
import InstagramIcon from "../../../Assets/Icons/SocialMediaIcons/InstagramIcon";
import LinkedinIcon from "../../../Assets/Icons/SocialMediaIcons/LinkedinIcon";
import LinkIcon from "../../../Assets/Icons/SocialMediaIcons/LinkIcon";
import TwitterIcon from "../../../Assets/Icons/SocialMediaIcons/TwitterIcon";
import YoutubeIcon from "../../../Assets/Icons/SocialMediaIcons/YoutubeIcon";
import StrokeBottomIcon from "../../../Assets/Icons/StrokeBottomIcon";
import TickSquareIcon from "../../../Assets/Icons/tickSquareIcon";

function PersonalInfoSection({ field, setField }) {
  let [clickCheckbox, setClickCheckbox] = useState(true);
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div id="pop-up-container" className="pop-up-container" onClick={(e) => e.target.id === "pop-up-container" && setField([])}>
      <div id="pop-up-wrapper" className="pop-up-wrapper">
        <div className="personal-info-name">
          <span>{field.name}</span>
          <EditSquareIcon />
        </div>
        {field.fields.map((item, index) => {
          return (
            <div key={index} className="field-item">
              {["Add photo", "Military ID", "Driving license"].every((el) => el !== item.name) && <span>{item.name}</span>}
              <div className="item-footer">
                {["Last name", "First name"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <input
                        maxLength={item.metadata.maxLength}
                        placeholder={item.name}
                        required={item.metadata.required}
                        type={item.metadata.type}
                        className="input"
                      />
                    </div>
                    <div className="checkbox-wrapper">
                      <div className="checkbox">
                        <CheckboxDisabledIcon />
                      </div>
                    </div>
                  </div>
                )}
                {["Gender"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <input placeholder="Choose your gender" className=" input" type="text" />
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
                {["Date of birth"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <div className="day-select">
                        <select name="Day" className="select">
                          <option value="day" className="option">
                            Day
                          </option>
                          {(() => {
                            let result = [];
                            for (let i = 1; i <= 31; i++) {
                              result.push(
                                <option className="option" value={i} key={i}>
                                  {i}
                                </option>
                              );
                            }
                            return result;
                          })()}
                        </select>
                      </div>
                      <div className="mont-select">
                        <select name="Month" className="select" style={{ width: "142px" }}>
                          <option value="month" className="option">
                            Month
                          </option>
                          {months.map((el, index) => {
                            return (
                              <option className="option" value={el} key={index}>
                                {el}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="year-select">
                        <select name="Year" className="select" style={{ width: "142px" }}>
                          <option className="option" value="year">
                            Year
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
                {["Phone Number"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <input style={{ paddingLeft: "71px" }} placeholder="77 123 456" className=" input" type="text" />
                      <div
                        className="flag"
                        style={{ height: "40px", width: "71px", position: "absolute", display: "flex", justifyContent: "space-around" }}
                      >
                        <img width="21px" src="https://cdn-icons-png.flaticon.com/512/197/197516.png" alt="#" />
                        <StrokeBottomIcon />
                      </div>
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
                {["Email"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <input placeholder="Your email" className=" input" type="text" />
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
                {["Social media links"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      {item.fields.map((sites, index) => {
                        switch (sites.name) {
                          case "Facebook":
                            return (
                              <div key={index}>
                                <FacebookIcon />
                                <div className="checkbox-wrapper" style={{ marginLeft: "14px", marginRight: "40px" }}>
                                  <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                                    {clickCheckbox ? <CheckboxActiveIcon /> : <CheckboxDefaultIcon />}
                                  </div>
                                </div>
                              </div>
                            );
                          case "Linkedin":
                            return (
                              <div>
                                <LinkedinIcon />
                                <div className="checkbox-wrapper" style={{ marginLeft: "14px", marginRight: "40px" }}>
                                  <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                                    {clickCheckbox ? <CheckboxActiveIcon /> : <CheckboxDefaultIcon />}
                                  </div>
                                </div>
                              </div>
                            );
                          case "Twitter":
                            return (
                              <div>
                                <TwitterIcon />
                                <div className="checkbox-wrapper" style={{ marginLeft: "14px", marginRight: "40px" }}>
                                  <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                                    {clickCheckbox ? <CheckboxActiveIcon /> : <CheckboxDefaultIcon />}
                                  </div>
                                </div>
                              </div>
                            );
                          case "Instagram":
                            return (
                              <div>
                                <InstagramIcon />
                                <div className="checkbox-wrapper" style={{ marginLeft: "14px", marginRight: "40px" }}>
                                  <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                                    {clickCheckbox ? <CheckboxActiveIcon /> : <CheckboxDefaultIcon />}
                                  </div>
                                </div>
                              </div>
                            );
                          case "Youtube":
                            return (
                              <div>
                                <YoutubeIcon />
                                <div className="checkbox-wrapper" style={{ marginLeft: "14px", marginRight: "40px" }}>
                                  <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                                    {clickCheckbox ? <CheckboxActiveIcon /> : <CheckboxDefaultIcon />}
                                  </div>
                                </div>
                              </div>
                            );
                          case "Behance":
                            return (
                              <div>
                                <BehanceIcon />
                                <div className="checkbox-wrapper" style={{ marginLeft: "14px", marginRight: "40px" }}>
                                  <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                                    {clickCheckbox ? <CheckboxActiveIcon /> : <CheckboxDefaultIcon />}
                                  </div>
                                </div>
                              </div>
                            );
                          case "Dribbble":
                            return (
                              <div>
                                <DribbbleIcon />
                                <div className="checkbox-wrapper" style={{ marginLeft: "14px", marginRight: "40px" }}>
                                  <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                                    {clickCheckbox ? <CheckboxActiveIcon /> : <CheckboxDefaultIcon />}
                                  </div>
                                </div>
                              </div>
                            );
                          case "Github":
                            return (
                              <div>
                                <GithubIcon />
                                <div className="checkbox-wrapper" style={{ marginLeft: "14px", marginRight: "40px" }}>
                                  <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                                    {clickCheckbox ? <CheckboxActiveIcon /> : <CheckboxDefaultIcon />}
                                  </div>
                                </div>
                              </div>
                            );
                          case "Custom link":
                            return (
                              <div>
                                <LinkIcon />
                                <div className="checkbox-wrapper" style={{ marginLeft: "14px", marginRight: "40px" }}>
                                  <div className="checkbox" onClick={(e) => setClickCheckbox(!clickCheckbox)}>
                                    {clickCheckbox ? <CheckboxActiveIcon /> : <CheckboxDefaultIcon />}
                                  </div>
                                </div>
                              </div>
                            );

                          default:
                            return <div></div>;
                        }
                      })}
                    </div>
                    <button id={item.name} className="delete-btn" style={{ position: "absolute", right: "24px" }}>
                      <DeleteIcon /> Delete
                    </button>
                  </div>
                )}
                {["Country"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <input placeholder="Select your country" className=" input" type="text" />
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
                {["City", "Address"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <input placeholder={item.name} className=" input" type="text" />
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
                {["Salary"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <div>
                        <input style={{ width: "321px", marginRight: "10px" }} placeholder="Expected Salary" className=" input" type="text" />
                      </div>
                      <div className="salary-select">
                        <select name="salary" className="select" style={{ width: "90px" }}>
                          <option className="option" value="USD">
                            USD
                          </option>
                          <option className="option" value="RUB">
                            RUB
                          </option>
                          <option className="option" value="EUR">
                            EUR
                          </option>
                          <option className="option" value="AMD">
                            AMD
                          </option>
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
                {["Add photo", "Military ID", "Driving license"].some((el) => el === item.name) && (
                  <div>
                    <div>
                      <span>{item.name} </span>
                    </div>
                    <div className="checkbox-wrapper" style={{ position: "absolute", left: "193px" }}>
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
export default PersonalInfoSection;
