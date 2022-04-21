import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import Button from "../../../../../shared/components/Button";
import {setDeleteAddSection, setTemplateData} from "../../../../../store/globalData/slice";
import {DeleteIcon} from "../../../../../assets/icons/jobseeker";
import {LANGUAGE_LEVEL_BTN_COLOR, MAIN_PURPLE, WHITE} from "../../../../../constants/colors";

export default function LanguageLevelContainer({data, fields, id, depend}) {
    const templateData = useSelector((state) => state.globalData.templateData)
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={<Box
            sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>{data.name}</Box>
            {fields.filter(el => el.metadata.status !== 'DELETED').length !== 1 ? (<Box sx={{
                cursor: "pointer",
                fill: "#4C494F",
                transition: "all 0.5s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                    fill: MAIN_PURPLE,
                    transition: "all 0.5s",
                }
            }}
                                                                                        onClick={() => {
                                                                                            dispatch(setDeleteAddSection({
                                                                                                templateData,
                                                                                                id
                                                                                            }))
                                                                                        }}
            > <DeleteIcon/> </Box>) : null}
        </Box>}
        Component={
            <Box sx={{display: 'flex', width: '500px', gap: '16px'}}>
                {data.metadata.values.map(el => <Button
                        disabled={!depend ? true : false}
                        key={el}
                        sx={{
                            width: '156px',
                            color: !depend ? "#EFEFEF" : '#8C8C8C',
                            border: '1px solid #D9D9D9',
                            ...(data.metadata.submitted_value === el ? {
                                background: LANGUAGE_LEVEL_BTN_COLOR,
                                color: WHITE
                            } : !depend ? {background: "#D9D9D9"} : {}),
                            '&:hover': {
                                background: MAIN_PURPLE,
                                color: WHITE
                            }
                        }}
                        onClick={() => {
                            dispatch(setTemplateData({id: data.id, value: el}))
                        }}
                    >
                        {el}
                    </Button>
                )}
            </Box>
        }
    />
}
