import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Switch } from "@mui/material";
import { DefaultUserIcon } from "../../../assets/icons/jobseeker";
import { HOME_PRIMARY_BUTTON } from "../../../shared/styles";
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
import {STATUS_PRIVATE, STATUS_PUBLIC, useUsersInfo} from "./hooks";
import {Chek} from "../../../assets/icons/hrProfile";
import {ENTER_KEY} from "../../../constants/keyCodes";
import {instance, POST_PROFILR_STATUS, POST_UPDATE_HEADLINE} from "../../../constants/requests";
import {setIsLoading, setLoading} from "../../../store/auth/authSlice";
import {TemplateNamePenSVG} from "../../../assets/icons/createTemplate";
import { selectAuthUserInfo } from "../../../store/auth/selector";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filtersList = useGetAnnouncementFilterList()
    // const { email, firstName, lastName } = useSelector(selectAuthUserInfo);
    const authUserInfo = useSelector(selectAuthUserInfo);
    const [location, setLocation] = useState('')
    const [searchTitleValue, setSearchTitleValue] = useState('')
    const [jobType, setJobType] = useState('')
    const [searchButtonClick, setSearchButtonClick] = useState(false)


    useEffect(() => {
        dispatch(setAllTemplateData(null));
        dispatch(setExactPage(1));
    }, [dispatch]);
    const info = useUsersInfo()
    const [headlineValue, setHeadlineValue] = info.headline
    const userInfo = info.userInfo
    const [profileStatus, setSrofileStatus] = info.profileStatus
    const [isEditText, setIsEditText] = info.isEditText

    const updateHeadline = useCallback(() => {
        // eslint-disable-next-line
        dispatch(setIsLoading(true))
        setIsEditText(false)
        instance.post(POST_UPDATE_HEADLINE, {
            headline: headlineValue
        }).then(response => {
            dispatch(setIsLoading(false))
        }).catch(err => {
            console.log(err);
            dispatch(setLoading(false))
        })
    }, [dispatch, headlineValue,setIsEditText])
    return (
        <JobSeekerContainer>
            <Box sx={{display: "flex", flexDirection: "column", gap: "24px"}}>
                <Box sx={{display: "flex", gap: "20px", flexWrap: 'wrap'}}>
                    <MainBox>
                        <Box>
                            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                                <Box sx={{display: "flex", gap: "8px", alignItems: "center"}}>
                                    <Box sx={SWITCH_TITLE}>Private</Box>
                                    <Switch
                                        sx={SWITCH}
                                        checked={profileStatus === STATUS_PUBLIC}
                                        onChange={() => {
                                            setSrofileStatus(profileStatus === STATUS_PUBLIC ? STATUS_PRIVATE : STATUS_PUBLIC)
                                            dispatch(setLoading(true))
                                            instance.post(POST_PROFILR_STATUS, {
                                                profile_status: profileStatus === STATUS_PRIVATE ? STATUS_PUBLIC : STATUS_PRIVATE
                                            }).then(response => {
                                                dispatch(setLoading(false))
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                            dispatch(setLoading(false))
                                        }}

                                    />
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
                                        {userInfo.fullName}
                                    </Box>
                                    <Box sx={{...USER_EMAIL}}>
                                        {userInfo.email}
                                        <Box className="title">{info.email}</Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{mt: "50px"}}>
                                {headlineValue === '' || isEditText ? (<JobSeekerSubsection
                                    label="Headline"
                                    Component={<TextField
                                        value={headlineValue}
                                        onChange={(e) => {
                                            setHeadlineValue(e.target.value)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === ENTER_KEY) {
                                                updateHeadline()
                                            }
                                        }}
                                        placeholder="Add headline"
                                        InputProps={{
                                            endAdornment: <Box sx={{cursor: "pointer"}}
                                                               onClick={updateHeadline}
                                            ><Chek/></Box>
                                        }}
                                    />}
                                />) : <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <Box sx={{
                                        display: "flex",
                                        fontFamily: "Poppins",
                                        fontSize: "18px",
                                        lineHeight: "27px",
                                        "& span": {
                                            ml: "6px"
                                        }
                                    }}>
                                        <p>Headline:</p>
                                        <span>{headlineValue}</span>
                                    </Box>
                                    <Box sx={{
                                        width: "17px",
                                        height: "17px",
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer"
                                    }}
                                         onClick={() => setIsEditText(true)}
                                    >
                                        <TemplateNamePenSVG/>
                                    </Box>
                                </Box>
                                }

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
                                    {authUserInfo.cvTemplateId ? "Edit CV" : "Create CV"}
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
