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
                                sx={{
                                    display: 'flex',
                                    background: '#FFF',
                                    boxShadow: !open ? '0px 4px 4px rgba(182, 182, 182, 0.16)' : '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    height: '120px',
                                    alignItems: 'center',
                                    px: '20px',
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '24px',
                                    position: "relative"
                                }}
                                onClick={() => {
                                    setTableData(tableData.map(el => {
                                        return {...el, open: el.id === id ? !el.open : false}
                                    }))
                                }}
                            >
                                <Box sx={{
                                    flex: 2,
                                    "& span": {
                                        display: "block",
                                    },
                                    '& span:nth-of-type(2)': {
                                        mt: '10px',
                                        fontSize: '16px',
                                    },
                                }
                                }>
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
                                            navigate(`announcement/${id}`)
                                        }}
                                    >
                                        View more
                                    </Button>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    p: '54px 40px 55px', ...(!open ? {display: 'none'} : {}),
                                    background: '#FDFDFD',
                                    boxShadow: '0px 4px 4px rgba(182, 182, 182, 0.16)',
                                    borderRadius: '8px',
                                }}>
                                <Box sx={{
                                    fontSize: "24px",
                                    lineHeight: "24px",
                                    "& p": {
                                        fontFamily: "'Poppins', sans-serif",
                                        fontSize: "16px",
                                        lineHeight: "20px",
                                        mt: 2,
                                        mb: 1.875,
                                        color: "rgba(51, 27, 59, 0.66)",
                                        pl: "8.5px"
                                    },
                                }}>
                                    <h4>Job Description</h4>
                                    <p>{jobDescription}</p>
                                </Box>

                                {jobResponsibilities ? <Box sx={{
                                    fontSize: "24px",
                                    lineHeight: "24px",
                                    "& h4": {
                                        mt: 6.75
                                    },
                                }}>
                                    <Box sx={{
                                        width: "100%",
                                        height: "1px",
                                        backgroundColor: "#D2D2D2"
                                    }}/>
                                    <h4>Job Responsibilities</h4>
                                    <Box sx={{
                                        fontFamily: 'Poppins',
                                        "& .MUIRichTextEditor-container-2": {
                                            fontFamily: "Poppins",
                                            color: "rgba(51, 27, 59, 0.66)",
                                            pl: 2.25

                                        }
                                    }}>
                                        <MUIRichTextEditor
                                            defaultValue={jobResponsibilities}
                                            controls={[]}
                                            readOnly
                                        />
                                    </Box>
                                </Box> : null}
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                    mt: 8.175
                                }}>
                                    <Button
                                        sx={{
                                            ...TEMPLATE_BUTTON_ADD,
                                            width: '179px',
                                            height: '40px',
                                        }}
                                        onClick={() => {
                                            navigate(`announcement/${id}`)
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
