import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUserInfo} from "../../../store/auth/selector";
import {useNavigate} from "react-router-dom";
import {Box, Button, Switch} from "@mui/material";
import {DefaultUserIcon} from "../../../assets/icons/jobseeker";
import {HOME_PRIMARY_BUTTON} from "../../../shared/styles";
import MainBox from "./MainBox";
import {SWITCH, SWITCH_TITLE, USER_EMAIL, USER_NAME} from "./style";
import {MAIN_PURPLE} from "../../../style/colors";
import {setAllTemplateData, setExactPage,} from "../../../store/globalData/slice";
import JobSeekerContainer from "../../shared/JobSeekerContainer";
import Search from "../search/Search";
import TextField from "../../../shared/components/Textfield";
import {ReactComponent as SearchLoopSVG} from "../../../assets/icons/searchLoop.svg";
import Select from "../../../shared/components/Select";
import {useGetAnnouncementFilterList} from "../hook";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filtersList = useGetAnnouncementFilterList()
    const {email, firstName, lastName} = useSelector(selectAuthUserInfo);
    const userInfo = useSelector((state) => state.auth.userInfo);
    const [location, setLocation] = useState('')
    const [searchTitleValue, setSearchTitleValue] = useState('')
    const [jobType, setJobType] = useState('')
    const [searchButtonClick, setSearchButtonClick] = useState(false)
    useEffect(() => {
        dispatch(setAllTemplateData(null));
        dispatch(setExactPage(1));
    }, [dispatch]);

    return (
        <JobSeekerContainer>
            <Box sx={{display: "flex", flexDirection: "column", gap: "24px"}}>
                <Box sx={{display: "flex", gap: "20px", flexWrap: 'wrap'}}>
                    <MainBox>
                        <Box>
                            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                                <Box sx={{display: "flex", gap: "8px", alignItems: "center"}}>
                                    <Box sx={SWITCH_TITLE}>Private</Box>
                                    <Switch sx={SWITCH}/>
                                    <Box sx={SWITCH_TITLE}>Public</Box>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "40px",
                                    mt: "35px",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        background: MAIN_PURPLE,
                                        width: "78px",
                                        height: "78px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <DefaultUserIcon/>
                                </Box>
                                <Box
                                    sx={{display: "flex", flexDirection: "column", gap: "12px"}}
                                >
                                    <Box sx={{...USER_NAME}}>
                                        {firstName} {lastName}
                                    </Box>
                                    <Box sx={{...USER_EMAIL}}>
                                        {email}
                                        <Box className="title">{email}</Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{mt: "50px"}}>
                                <JobSeekerSubsection
                                    label="Headline"
                                    Component={<TextField placeholder="Add headline"/>}
                                />
                            </Box>
                            <Box sx={{mt: "40px"}}>
                                <JobSeekerSubsection
                                    label={
                                        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                            <Box>Profile completeness</Box>
                                            <Box>0%</Box>
                                        </Box>
                                    }
                                    Component={
                                        <Box
                                            sx={{
                                                height: '18px',
                                                width: '100%',
                                                border: '1px solid #D9D9D9',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    }
                                />
                            </Box>
                            <Box
                                sx={{
                                    mt: '40px',
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Button
                                    sx={HOME_PRIMARY_BUTTON}
                                    style={{textTransform: "none"}}
                                    onClick={() => navigate("profile")}
                                >
                                    Complete my profile
                                </Button>
                                <Button
                                    sx={HOME_PRIMARY_BUTTON}
                                    style={{textTransform: "none"}}
                                    onClick={() => {
                                        navigate("create-cv");
                                    }}
                                >
                                    {userInfo.cvTemplateId ? "Edit CV" : "Create CV"}
                                </Button>
                            </Box>
                        </Box>
                    </MainBox>

                    <MainBox isRegardingJobs/>
                    <MainBox isRegardingJobs/>
                </Box>
                <MainBox sx={{minHeight: "821px"}}>
                    <Search
                        SearchComponent={
                            <Box sx={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                                <TextField
                                    InputProps={{startAdornment: <SearchLoopSVG/>}}
                                    sx={{width: '543px'}}
                                    value={searchTitleValue}
                                    placeholder="Search"
                                    onChange={(event) => {
                                        setSearchTitleValue(event.target.value)
                                    }}
                                />
                                <TextField
                                    sx={{width: '253px'}}
                                    placeholder="Location"
                                    value={location}
                                    onChange={
                                        (event) => {
                                            setLocation(event.target.value)
                                        }
                                    }
                                />
                                <Select
                                    fieldStyle={{flex: 1}}
                                    placeHolder="Job-type"
                                    value={jobType || undefined}
                                    menuItems={filtersList[1]?.values}
                                    onChange={(event) => {
                                        setJobType(event.target.value)
                                    }}
                                />
                                <Button sx={{...HOME_PRIMARY_BUTTON, height: '40px'}} onClick={() => {
                                    setSearchButtonClick(true)
                                }}>View jobs</Button>
                            </Box>
                        }
                        {...{searchButtonClick, setSearchButtonClick, location, jobType}}
                    />
                </MainBox>
            </Box>
        </JobSeekerContainer>
    );
}
