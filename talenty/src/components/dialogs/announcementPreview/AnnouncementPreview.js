import {selectTemplateData} from "../../../store/globalData/selector";
import {Box, Button} from '@mui/material'
import {useDispatch, useSelector} from "react-redux";
import GeneralInfoAnnouncement from "./GeneralInfo";
import VacancyDetails from "./VacancyDetails";
import Skill from "./Skills";
import Other from "./Other";
import {TEMPLATE_ITEM_BUTTON} from "../../../shared/styles";
import {setDialogInitialState} from "../../../store/dialogs/slice";
import {isRequiredFieldsFilled} from "../../../helpers/dialog";

export default function AnnouncementPreview() {
    const data = useSelector(selectTemplateData)
    const dispatch = useDispatch()

    return <Box sx={{width: '1142px', padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: '68px'}}>
        <Box>
            {
                data.fields.map(field => {
                    switch (field.name) {
                        case 'General Information': {
                            return <GeneralInfoAnnouncement data={field} key={field.id}/>
                        }
                        case 'Vacancy details': {
                            return <VacancyDetails data={field} key={field.id}/>
                        }
                        case 'Skills': {
                            return <Skill data={field} key={field.id}/>
                        }
                        default: {
                            return <Other data={field} key={field.id}/>
                        }
                    }
                })
            }
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: '24px'}}>
            <Button style={{textTransform: 'none'}} sx={{
                width: '179px',
                color: '#8C0DF0',
                border: '1px solid #8C0DF0',
                height: '34px',
            }}
                    onClick={() => {
                        dispatch(setDialogInitialState())
                    }}
            >
                Cancel
            </Button>
            <Button
                sx={{
                    ...TEMPLATE_ITEM_BUTTON,
                    width: "179px",
                    color: "#FFFFFF",
                    "&:hover": {
                        background: "#8C0DF0",
                    },
                    "&.Mui-disabled": {
                        background: "#9F9F9F",
                    },
                    background: "#8C0DF0",
                }}
                style={{textTransform: "none"}}
                disabled={!isRequiredFieldsFilled(data)}
                // onClick={() => {
                //     onSave({dispatch, dialogData, templateData});
                // }}
            >
                Publish
            </Button>
        </Box>
    </Box>
}