import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import Button from "../../../../shared/components/Button";
import {setDeleteAddSection, setTemplateData} from "../../../../store/globalData/slice";
import { DeleteSectionBtn } from "../../../../assets/icons/jobseeker";
import { LANGUAGE_LEVEL_BTN_COLOR, MAIN_PURPLE } from "../../../../constants/colors";

export default function LanguageLevelContainer({data,fields,id}) {
    const templateData = useSelector((state) => state.globalData.templateData)
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={<Box
            sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box >{data.name}</Box>
                {fields.length !== 1 ?(<Box sx={{
                     cursor:"pointer",
                    fill:"#4C494F",
                    transition: "all 0.5s",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    "&:hover":{
                        fill: MAIN_PURPLE,
                        transition: "all 0.5s",
                    }
                }}
                onClick={()=>{
                    dispatch(setDeleteAddSection({templateData,id}))
                }}
                > <DeleteSectionBtn style={{
                    fill:"inherit"
                }} /> </Box>): null}
        </Box>}
        Component={
            <Box sx={{display: 'flex', width: '500px', gap: '16px'}}>
                {data.metadata.values.map(el => <Button
                        key={el}
                        sx={{
                            width: '156px',
                            color: '#8C8C8C',
                            border: '1px solid #8C8C8C',
                            ...(data.metadata.submitted_value === el ? {background: LANGUAGE_LEVEL_BTN_COLOR} : {}),
                            '&:hover': {
                                background: MAIN_PURPLE,
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
