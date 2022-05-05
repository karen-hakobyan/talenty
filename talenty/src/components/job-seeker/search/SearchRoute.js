import {useState} from "react";
import {Box} from "@mui/material";
import JobSeekerContainer from "../../shared/JobSeekerContainer";
import Search from "./Search";
import TextField from "../../../shared/components/Textfield";
import Button from "../../../shared/components/Button";
import {HOME_PRIMARY_BUTTON} from "../../../shared/styles";
import Select from "../../../shared/components/Select";
import {ReactComponent as SearchLoopSVG} from "../../../assets/icons/searchLoop.svg";
import useGetSearchData from "../hook";

export default function SearchRoute() {
    const [jobType, setJobType] = useState('')
    const [employmentTerms, setEmploymentTerms] = useState('')
    const [jobCategory, setJobCategory] = useState('')
    const [candidateLevel, setCandidateLevel] = useState('')
    const [location, setLocation] = useState('')
    const [title, setTitle] = useState('')
    const [searchButtonClick, setSearchButtonClick] = useState(false)
    const data = useGetSearchData({searchButtonClick, setSearchButtonClick, isInitiallyGetData: true})
    return <JobSeekerContainer>
        <Search
            SearchComponent={
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '26px'}}>
                    <Box sx={{display: 'flex', gap: '12px'}}>
                        <TextField
                            sx={{flex: 1}}
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value)
                            }}
                            placeholder="Search"
                            InputProps={{startAdornment: <SearchLoopSVG/>}}
                        />
                        <Button sx={{...HOME_PRIMARY_BUTTON, width: '254px', height: '40px'}} onClick={() => {
                            setSearchButtonClick(true)
                        }}>
                            Find my next job
                        </Button>
                    </Box>
                    <Box sx={{display: 'flex', gap: '12px'}}>
                        <Select
                            fieldStyle={{flex: 1}}
                            placeHolder="Employment terms"
                            value={employmentTerms || undefined}
                        />
                        <Select
                            fieldStyle={{flex: 1}}
                            placeHolder="Job type"
                            value={jobType || undefined}
                        />
                        <Select
                            fieldStyle={{flex: 1}}
                            placeHolder="Job category"
                            value={jobCategory || undefined}
                        />
                        <Select
                            fieldStyle={{flex: 1}}
                            placeHolder="Candidate level"
                            value={candidateLevel || undefined}
                        />
                        <TextField
                            sx={{flex: 1}}
                            placeholder="Location" value={location}
                            onChange={
                                (event) => {
                                    setLocation(event.target.value)
                                }
                            }
                        />
                    </Box>
                    <Box sx={{height: '1px', background: '#E4E4E4', mt: '10px'}}/>
                </Box>
            }
        />
    </JobSeekerContainer>
}