import {useState} from "react";
import {Box} from "@mui/material";
import JobSeekerContainer from "../../shared/JobSeekerContainer";
import Search from "./Search";
import TextField from "../../../shared/components/Textfield";
import Button from "../../../shared/components/Button";
import {HOME_PRIMARY_BUTTON} from "../../../shared/styles";
import Select from "../../../shared/components/Select";
import {ReactComponent as SearchLoopSVG} from "../../../assets/icons/searchLoop.svg";
import {useGetAnnouncementFilterList} from "../hook";
import { COUNTRY_NAMES } from "../../../helpers/country";

export default function SearchRoute() {
    const [jobType, setJobType] = useState('')
    const [employmentTerms, setEmploymentTerms] = useState('')
    const [jobCategory, setJobCategory] = useState('')
    const [candidateLevel, setCandidateLevel] = useState('')
    const [location, setLocation] = useState('')
    const [title, setTitle] = useState('')
    const [searchButtonClick, setSearchButtonClick] = useState(false)
    const filterList = useGetAnnouncementFilterList()

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
                            menuItems={filterList.find(el => el.type === "employment_terms")?.values}
                            onChange={(event) => {
                                setEmploymentTerms(event.target.value)
                            }}
                        />
                        <Select
                            fieldStyle={{flex: 1}}
                            placeHolder="Job type"
                            value={jobType || undefined}
                            menuItems={filterList.find(el => el.type === "job_type")?.values}
                            onChange={(event) => {
                                setJobType(event.target.value)
                            }}
                        />
                        <Select
                            fieldStyle={{flex: 1}}
                            placeHolder="Job category"
                            value={jobCategory || undefined}
                            menuItems={filterList.find(el => el.type === "job_category")?.values}
                            onChange={(event) => {
                                setJobCategory(event.target.value)
                            }}
                        />
                        <Select
                            fieldStyle={{flex: 1}}
                            placeHolder="Candidate level"
                            value={candidateLevel || undefined}
                            menuItems={filterList.find(el => el.type === "candidate_level")?.values}
                            onChange={(event) => {
                                setCandidateLevel(event.target.value)
                            }}
                        />
                        <Select 
                            fieldStyle={{flex:1}}
                            placeHolder="Location"
                            value={location ||undefined }
                            onChange={
                                (event) => {
                                    setLocation(event.target.value)
                                }
                            }
                            menuItems={COUNTRY_NAMES}
                         />
                    </Box>
                    <Box sx={{height: '1px', background: '#E4E4E4', mt: '10px'}}/>
                </Box>
            }
            {...{
                setSearchButtonClick,
                searchButtonClick,
                jobType,
                employmentTerms,
                jobCategory,
                location,
                title,
                candidateLevel
            }}
        />
    </JobSeekerContainer>
}
