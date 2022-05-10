import {useEffect, useState} from "react";
import useGetSearchData from "../hook";
import {Box} from "@mui/material";
import {JOBS_TITLE} from "../../../style/texts";
import {TEMPLATE_BUTTON_ADD} from "../../../shared/styles";
import Button from "../../../shared/components/Button";
import {ReactComponent as LocationSVG} from "../../../assets/icons/location.svg";
import {ReactComponent as WorkSVG} from "../../../assets/icons/work.svg";
import {ANNOUNCEMENT} from "../../../constants/routes";

export default function Search({
                                   SearchComponent,
                                   searchButtonClick,
                                   setSearchButtonClick,
                                   ...rest
                               }) {
    const data = useGetSearchData({searchButtonClick, setSearchButtonClick, ...rest});
    console.log(data)
    const [tableData, setTableData] = useState([])
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
                    {tableData.map(({id, name, companyName, jobType, country, jobDescription, city, open}) => {
                        return <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    background: '#FDFDFD',
                                    boxShadow: '0px 4px 4px rgba(182, 182, 182, 0.16)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    height: '120px',
                                    alignItems: 'center',
                                    px: '20px',
                                    fontWeight: 400,
                                    fontSize: '18px',
                                    lineHeight: '24px',
                                }}
                                key={id}
                                onClick={() => {
                                    setTableData(tableData.map(el => {
                                        return {...el, open: el.id === id}
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
                                <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button
                                        sx={{...TEMPLATE_BUTTON_ADD, width: '179px', height: '40px'}}
                                        onClick={() => {
                                            window.open(`${ANNOUNCEMENT}/${id}`, '_blank')
                                        }}
                                    >
                                        View more
                                    </Button>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    p: '57px 40px 55px', ...(!open ? {display: 'none'} : {}),
                                    background: '#FDFDFD',
                                    boxShadow: '0px 4px 4px rgba(182, 182, 182, 0.16)',
                                    borderRadius: '8px',
                                }}
                            >

                            </Box>
                        </Box>
                    })}
                </Box>
            }
        </Box>
    );
}
