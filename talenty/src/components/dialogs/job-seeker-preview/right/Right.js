import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {RIGHT_TYPES} from "./typesPerName";
import {useDispatch, useSelector} from "react-redux";
import {TEMPLATE_BUTTON_ADD, TEMPLATE_BUTTON_CREATE} from "../../../../shared/styles";
import {cleanTemplateNewIds} from "../../../../helpers/actions";
import {editJobSeekerCv, saveJobSeekerCV} from "../../../../store/globalData/getTemplateActions";
import Button from "../../../../shared/components/Button";
import {selectTemplateData} from "../../../../store/globalData/selector";
import {setDialogInitialState} from "../../../../store/dialogs/slice";
import {MAIN_PURPLE} from "../../../../style/colors";

export default function Right({data}) {
    const dispatch = useDispatch()
    const templateData = useSelector(selectTemplateData)
    const userInfo = useSelector(state => state.auth.userInfo)
    const navigate = useNavigate()
    return <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            {
                data.map(el => {
                    let TempComponent = RIGHT_TYPES[el.name]
                    if (!TempComponent) {
                        return null
                    }
                    return <TempComponent key={el.id} data={el}/>
                })
            }
        </Box>
        <Box sx={{flex: 1}}/>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Box sx={{display: 'flex', gap: '24px'}}>
                <Button
                    sx={{...TEMPLATE_BUTTON_ADD, color: MAIN_PURPLE, width: '179px'}}
                    onClick={() => {
                        dispatch(setDialogInitialState())
                    }}
                >
                    Cancel
                </Button>
                <Button
                    sx={{...TEMPLATE_BUTTON_CREATE, color: "white", width: '179px'}}
                    onClick={async () => {
                        const data = cleanTemplateNewIds(templateData)
                        await dispatch(userInfo.cvTemplateId ? editJobSeekerCv({
                            data,
                            parentId: templateData.parentId
                        }) : saveJobSeekerCV(data))
                        dispatch(setDialogInitialState())
                        navigate('/')
                    }}
                >
                    {userInfo?.cvTemplateId ? 'Edit' : 'Save'}
                </Button>
            </Box>
        </Box>
    </Box>
}