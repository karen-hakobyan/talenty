import {useEffect, useState} from "react";
import MUIRichTextEditor from "mui-rte";
import {useNavigate} from "react-router-dom";
import {Box} from "@mui/material";
import useGetSearchData from "../hook";
import {JOBS_TITLE} from "../../../style/texts";
import {TEMPLATE_BUTTON_ADD} from "../../../shared/styles";
import Button from "../../../shared/components/Button";
import {ReactComponent as LocationSVG} from "../../../assets/icons/location.svg";
import {ReactComponent as WorkSVG} from "../../../assets/icons/work.svg";
import {
    BUTTON_CENTR_STYLES,
    job_container,
    JOB_DESCRIPTION,
    JOB_NAME_AND_COMPANY_NAME,
    JOB_RESPONSIBIITIS_CONTAINER,
    LINE,
    MORE_INFORMATION,
    MUI_RICH_TEXT_EDITOR_STYLES
} from "./style";

export default function Search({
                                   SearchComponent,
                                   searchButtonClick,
                                   setSearchButtonClick,
                                   ...rest
                               }) {
    const data = useGetSearchData({searchButtonClick, setSearchButtonClick, ...rest});
    const [tableData, setTableData] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        setTableData(data.map(el => ({...el, open: false})))
    }, [data])
    return (
        <Box>
            <Box sx={{pb: "5px", borderBottom: "2px solid #D2D2D2"}}>
                <Box sx={JOBS_TITLE}>Search for jobs</Box>
            </Box>
            {
                SearchComponent && <Box sx={{mt: '24px'}}>
                    {SearchComponent}
                </Box>
            }
            <Box sx={{...JOBS_TITLE, mt: '40px', mb: '40px'}}>
                All jobs
            </Box>
            {
                tableData && <Box
                    sx={{display: "flex", flexDirection: "column", gap: "40px", fontFamily: 'Poppins'}}>
                    {tableData.map(({
                                        id,
                                        name,
                                        companyName,
                                        jobType,
                                        country,
                                        jobDescription,
                                        city,
                                        open,
                                        jobResponsibilities
                                    }) => {
                        return <Box key={id}>
                            <Box
                                sx={job_container(open)}
                                onClick={() => {
                                    setTableData(tableData.map(el => {
                                        return {...el, open: el.id === id ? !el.open : false}
                                    }))
                                }}
                            >
                                <Box sx={JOB_NAME_AND_COMPANY_NAME}>
                                    <span>{name}</span>
                                    <span>{companyName}</span>
                                </Box>
                                <Box sx={{flex: 1, display: 'flex', gap: '14px'}}>
                                    <LocationSVG/>
                                    <Box sx={{}}>{country}{city && ', ' + city}</Box>
                                </Box>
                                <Box sx={{flex: 1, display: 'flex', gap: '14px'}}>
                                    <WorkSVG/>
                                    <Box>{jobType}</Box>
                                </Box>
                                <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}
                                     onClick={(e) => {
                                         e.stopPropagation()
                                         // mui button event does not support stop propogation for that we dont add in button action
                                     }}>
                                    <Button
                                        sx={{...TEMPLATE_BUTTON_ADD, width: '179px', height: '40px'}}
                                        onClick={() => {
                                            navigate(`/home-page/announcement/${id}`)
                                        }}
                                    >
                                        View more
                                    </Button>
                                </Box>
                            </Box>
                            <Box
                                sx={MORE_INFORMATION(open)}>
                                <Box sx={JOB_DESCRIPTION}>
                                    <h4>Job Description</h4>
                                    <p>{jobDescription}</p>
                                </Box>

                                {jobResponsibilities ? <Box sx={JOB_RESPONSIBIITIS_CONTAINER}>
                                    <Box sx={LINE}/>
                                    <h4>Job Responsibilities</h4>
                                    <Box sx={MUI_RICH_TEXT_EDITOR_STYLES}>
                                        <MUIRichTextEditor
                                            defaultValue={jobResponsibilities}
                                            controls={[]}
                                            readOnly
                                        />
                                    </Box>
                                </Box> : null}
                                <Box sx={BUTTON_CENTR_STYLES}>
                                    <Button
                                        sx={{
                                            ...TEMPLATE_BUTTON_ADD,
                                            width: '179px',
                                            height: '40px',
                                        }}
                                        onClick={() => {
                                            navigate(`/home-page/announcement/${id}`)
                                        }}
                                    >
                                        View more
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    })}
                </Box>
            }
        </Box>
    );
}
