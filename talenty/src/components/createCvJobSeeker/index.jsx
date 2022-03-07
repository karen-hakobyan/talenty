import {Box} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ArrowBack, ArrowRight} from "../../assets/icons/jobseeker";
import Button from "../../shared/components/Button";
import SharedTemplateHeader from "../../shared/components/TemplateHeader";
import {HOME_PRIMARY_BUTTON, TEMPLATE_BUTTON_ADD} from "../../shared/styles";
import {
    addSectionContainerAction,
    setExactPage,
    setNextPage,
    setPrevPage,
    setSectionContainerController
} from "../../store/globalData/slice";
import {getTemplateActions, saveJobSeekerCV} from "../../store/globalData/getTemplateActions";
import Pagination from "./Pagination";
import UserCVBody from "./UserCVBody";

export default function CreateCvJobSeeker() {
    const dispatch = useDispatch();
    const exactPage = useSelector((state) => state.globalData.exactPage)
    const templateData = useSelector((state) => state.globalData.templateData)
    useEffect(() => {
        if (!exactPage) {
            dispatch(setExactPage(1))
        }
    }, [dispatch, exactPage])
    // update local storage whenever data changed and also redux
    useEffect(() => {
        if (templateData === null) {
            dispatch(getTemplateActions())
        }
    }, [dispatch, templateData])

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
                        {
                            templateData?.fields[exactPage - 1].fields[0].metadata.type === 'section_container' && templateData?.fields[exactPage - 1].name !== 'Publications' &&
                            <Button
                                sx={{...TEMPLATE_BUTTON_ADD, color: "#8C0DF0"}}
                                onClick={() => {
                                    dispatch(addSectionContainerAction(templateData.fields[exactPage - 1].id))
                                    dispatch(setSectionContainerController(null))
                                }}
                            >
                                Add
                            </Button>
                        }
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
                            <Button
                                sx={{...TEMPLATE_BUTTON_ADD, color: "#8C0DF0"}}
                                onClick={() => {
                                    dispatch(saveJobSeekerCV(templateData))
                                }}
                            >
                                Save
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
