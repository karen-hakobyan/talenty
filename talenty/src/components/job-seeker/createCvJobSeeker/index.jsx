import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {Box} from "@mui/material";
import {ArrowBack, ArrowRight} from "../../../assets/icons/jobseeker";
import Button from "../../../shared/components/Button";
import SharedTemplateHeader from "../../../shared/components/TemplateHeader";
import {HOME_PRIMARY_BUTTON, TEMPLATE_BUTTON_ADD} from "../../../shared/styles";
import {removeNewJwt, setExactPage, setNextPage, setPrevPage,} from "../../../store/globalData/slice";
import {getEditedUserCv, getTemplateActions, getTemplateById,} from "../../../store/globalData/getTemplateActions";
import Pagination from "./Pagination";
import UserCVBody from "./UserCVBody";
import AddButton from "./AddButton";
import {setJwt} from "../../../store/auth/authSlice";
import {setDialogIsOpen, setDialogType} from "../../../store/dialogs/slice";
import {filterUserCv} from "./actions";

export default function CreateCvJobSeeker({isApplyingId}) {
    const dispatch = useDispatch();
    const exactPage = useSelector((state) => state.globalData.exactPage)
    const tempTemplateData = useSelector((state) => state.globalData.templateData)
    const templateData = useMemo(() => {
        if (!tempTemplateData) {
            return null
        }
        return {...tempTemplateData, fields: tempTemplateData.fields.filter(el => el).filter(filterUserCv)}
    }, [tempTemplateData])
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
    useEffect(() => {
        if (isApplyingId) {
            dispatch(getTemplateById(isApplyingId))
        }
    }, [isApplyingId,dispatch])
    // update local storage whenever data changed and also redux
    useEffect(() => {
        if (!isApplyingId) {
            if (templateData === null) {
                dispatch(userInfo.cvTemplateId ? getEditedUserCv(userInfo.cvTemplateId) : getTemplateActions())
            }
        }

    }, [dispatch, templateData, userInfo,isApplyingId])

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
                            // add case for applying announcement
                            isApplyingId ? (
                                <Button
                                    sx={{...TEMPLATE_BUTTON_ADD, color: '#8C0DF0', width: '179px'}}
                                >
                                    Send
                                </Button>
                            ) : (
                                <Button
                                    sx={{...TEMPLATE_BUTTON_ADD, color: '#8C0DF0', width: '179px'}}
                                    onClick={() => {
                                        dispatch(setDialogType('jobSeekerPreview'));
                                        dispatch(setDialogIsOpen(true));
                                    }}
                                >
                                    Preview
                                </Button>
                            )

                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
