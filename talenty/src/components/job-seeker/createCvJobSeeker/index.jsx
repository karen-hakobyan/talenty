import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {ArrowBack, ArrowRight} from "../../../assets/icons/jobseeker";
import Button from "../../../shared/components/Button";
import SharedTemplateHeader from "../../../shared/components/TemplateHeader";
import {HOME_PRIMARY_BUTTON, TEMPLATE_BUTTON_ADD} from "../../../shared/styles";
import {removeNewJwt, setExactPage, setNextPage, setPrevPage,} from "../../../store/globalData/slice";
import {
    editJobSeekerCv, getEditedUserCv,
    getTemplateActions,
    saveJobSeekerCV
} from "../../../store/globalData/getTemplateActions";
import Pagination from "./Pagination";
import UserCVBody from "./UserCVBody";
import AddButton from "./AddButton";
import {setJwt} from "../../../store/auth/authSlice";
import {cleanTemplateNewIds} from "../../../helpers/actions";
import {setDialogData, setDialogInitialData, setDialogIsOpen, setDialogType} from "../../../store/dialogs/slice";

export default function CreateCvJobSeeker() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const exactPage = useSelector((state) => state.globalData.exactPage)
    const templateData = useSelector((state) => state.globalData.templateData)
    const newJwt = useSelector(state => state.globalData.newJwt)
    const userInfo = useSelector(state => state.auth.userInfo)

    useEffect(() => {
        if (!exactPage) {
            dispatch(setExactPage(1))
        }
    }, [dispatch, exactPage])

    useEffect(() => {
        if (newJwt) {
            dispatch(setJwt(newJwt))
            dispatch(removeNewJwt())
        }
    }, [newJwt, dispatch])

    // update local storage whenever data changed and also redux
    useEffect(() => {
        if (templateData === null) {
            dispatch(userInfo.cvTemplateId ? getEditedUserCv(userInfo.cvTemplateId) : getTemplateActions())
        }
    }, [dispatch, templateData, userInfo])

    if (!templateData) {
        return null;
    }
    return (
        <Box sx={{pt: "44px", pl: "52px", pr: "52px", minHeight: '100vh'}}>
            <Pagination pagesCount={templateData?.fields.length || 0} {...{exactPage}} />
            {/* body */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 'calc(100vh - 130px)'
            }}>
                <Box
                    sx={{
                        mt: "44px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "42px",
                    }}
                >
                    <SharedTemplateHeader title={templateData?.fields[exactPage - 1]?.name}/>
                    <UserCVBody data={templateData?.fields[exactPage - 1]}/>
                </Box>
                {/* actions bellow*/}
                <Box sx={{display: "flex", pt: '44px', pb: '40px'}}>
                    {exactPage !== 1 ? (
                        <Button
                            sx={HOME_PRIMARY_BUTTON}
                            onClick={() => dispatch(setPrevPage())}
                        >
                            <ArrowBack/>
                            Back
                        </Button>
                    ) : null}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flex: 1,
                            gap: "12px",
                        }}
                    >
                        <AddButton/>
                        {templateData?.fields && templateData.fields.length !== exactPage ? (
                            <Button
                                sx={HOME_PRIMARY_BUTTON}
                                onClick={() => {
                                    dispatch(setNextPage())
                                }}
                            >
                                Next
                                <ArrowRight/>
                            </Button>
                        ) : (
                            // <Button
                            //     sx={{...TEMPLATE_BUTTON_ADD, color: "#8C0DF0", width: '179px'}}
                            //     onClick={async () => {
                            //         const data = cleanTemplateNewIds(templateData)
                            //         await dispatch(userInfo.cvTemplateId ? editJobSeekerCv({
                            //             data,
                            //             parentId: templateData.parentId
                            //         }) : saveJobSeekerCV(data))
                            //         navigate('/')
                            //     }}
                            // >
                            //     {userInfo.cvTemplateId ? 'Edit' : 'Save'}
                            // </Button>
                            <Button
                                sx={{...TEMPLATE_BUTTON_ADD, color: '#8C0DF0', width: '179px'}}
                                onClick={() => {
                                    dispatch(setDialogType('jobSeekerPreview'));
                                    dispatch(setDialogIsOpen(true));
                                }}
                            >
                                Preview
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
