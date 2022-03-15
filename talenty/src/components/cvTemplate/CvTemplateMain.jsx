import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {styled} from "@mui/system";
import {Box, Dialog, IconButton, Typography,} from "@mui/material";
import {PINK} from "../../constants/colors";
import {AddSectionIconSVG, CreateCVTemplateSVG, ListSVG, TemplateNamePenSVG,} from "../../assets/icons/createTemplate";
import TemplateItem from "./TemplateItem";
import {setAllTemplateData} from "../../store/globalData/slice";
import { selectTemplateData, selectTemplateInitialData} from "../../store/globalData/selector";
import {TEMPLATE_BUTTON_ADD, TEMPLATE_BUTTON_CREATE,} from "../../shared/styles";
import AddSection from "../dialogs/addSection";
import {ENTER_KEY} from "../../constants/keyCodes";
import {selectAuthUserInfo} from "../../store/auth/selector";
import {LANDING_PAGE_ROUTE} from "../../constants/routes";
import {createCvHR, getTemplateActions} from "../../store/globalData/getTemplateActions";
import {compareObjects} from "../../helpers/compareTwoData";

const CustomInput = styled("input")(() => ({
    width: "100%",
    outline: "none",
    border: "none",
    fontFamily: "Proxima Nova",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px",
    "&:disabled": {
        backgroundColor: "transparent"
    },
    "&::placeholder": {
        color: "#4C494F"

    }
}))

const placeholderInput = "System Template"

function CvTemplateMain() {
    const [title, setTitle] = useState("");
    const data = useSelector(selectTemplateData)
    const userInfo = useSelector(selectAuthUserInfo)
    const [isTemplateNameText, setIsTemplateNameText] = useState(true);
    const [addSectionDialogIsOpen, setAddSectionDialogIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const unchangedData = useSelector(selectTemplateInitialData)
    const customInput = useRef(null)

    useEffect(() => {
        if (userInfo === null) {
            navigate(LANDING_PAGE_ROUTE)
        }
    }, [navigate, userInfo])

    useEffect(() => {
        setTitle(data?.name || "");
    }, [data]);

    // update local storage whenever data changed and also redux
    useEffect(() => {
        if(!data) {
            dispatch(getTemplateActions())
        }
    }, [data, dispatch]);

    if (!data) {
        return null;
    }

    return (
        <Box sx={{pr: "24px", pl: "24px", pb: "24px", maxHeight: 'calc(100vh - 80px)', overflow: 'scroll', flex: 1}}>
            <Dialog
                open={addSectionDialogIsOpen}
                maxWidth={false}
                onClose={() => {
                    setAddSectionDialogIsOpen(false);
                }}
            >
                <AddSection
                    setIsOpen={setAddSectionDialogIsOpen}
                    setTemplateData={(data) => dispatch(setAllTemplateData(data))}
                    templateData={data}
                />
            </Dialog>
            <Box sx={{display: "flex", paddingTop: "24px"}}>
                <ListSVG/>
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
            <Box
                sx={{
                    width: "100%",
                    borderBottom: "2px solid #D2D2D2",
                    display: "flex",
                    marginTop: "52px",
                    paddingBottom: "14px",
                    alignItems: "center",
                    gap: "14px",
                }}
            >
                <TemplateNamePenSVG
                    onClick={() => {
                        setIsTemplateNameText(false);
                        dispatch(setAllTemplateData({...data, name: ''}))
                        setTimeout(() => customInput.current.focus())

                    }}
                    style={{cursor: isTemplateNameText ? "pointer" : "default"}}
                />
                <CustomInput
                    ref={customInput}
                    placeholder={placeholderInput}
                    value={title}
                    disabled={!!isTemplateNameText}

                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    onBlur={() => {
                        setIsTemplateNameText(true);
                        dispatch(setAllTemplateData({...data, name: title}))
                    }}
                    onKeyDown={(event) => {
                        if (event.key === ENTER_KEY) {
                            setIsTemplateNameText(true);
                            dispatch(setAllTemplateData({...data, name: title}))
                        }
                    }}
                />

            </Box>
            {data.fields.map((item) => (
                item.metadata.status !== "DELETED" && <TemplateItem key={item.name} item={item} setData={(data) => dispatch(setAllTemplateData(data))} data={data}/>
            ))}
            <Box sx={{display: "flex", justifyContent: "flex-end", gap: "16px"}}>
                <IconButton
                    sx={TEMPLATE_BUTTON_ADD}
                    onClick={() => {
                        setAddSectionDialogIsOpen(true);
                    }}
                >
                    <AddSectionIconSVG/>
                    Add section
                </IconButton>
                <IconButton
                    sx={TEMPLATE_BUTTON_CREATE}
                    onClick={() => {
                        dispatch(createCvHR(data))
                    }}
                    disabled={compareObjects(unchangedData, data)}
                >
                    <CreateCVTemplateSVG/>
                    Create CV
                </IconButton>
            </Box>
        </Box>
    );
}

export default CvTemplateMain;
