import {memo, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Box} from "@mui/material";
import {selectLinksController} from "../../../store/globalData/selector";
import {setLinksController} from "../../../store/globalData/slice";
import SOCIAL_LINK_ICONS from "../../cvTemplate/typeComponents/section/socialLinkIcons";
import {Checkbox} from "../../shared/Checkbox";
import JobSeekerSubsection from "../JobSeekerSubsection";
import SpecialName from "./SpecialName";

export default function Section({data}) {
    if (data.fields[0].metadata.type === 'social_link') {
        return <SocialMedia {...{data}} />
    }
    return null
}

function SocialMedia({data}) {
    const dispatch = useDispatch()
    const linksController = useSelector(selectLinksController)
    useEffect(() => {
        if (linksController === null) {
            dispatch(setLinksController(data.fields.map((el) => ({...el, open: false}))))
        }
    }, [dispatch, linksController, data])
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box>
                <Box sx={{display: 'flex', gap: '20px'}}>
                    {linksController?.map(({open, name, id}) => {
                        let Icon = SOCIAL_LINK_ICONS[name]
                        if (!Icon) {
                            return null
                        }
                        Icon = memo(Icon)
                        return <Box key={id} sx={{display: 'flex', alignItems: 'center', gap: '14px'}}>
                            <Icon/>
                            <Checkbox checked={open} onChange={(event) => {
                                dispatch(setLinksController(linksController.map(el => ({
                                    ...el,
                                    open: el.id === id ? !el.open : el.open
                                }))))
                            }}/>
                        </Box>
                    })}
                </Box>
                {linksController?.some(el => el.open) &&
                    <Box sx={{mt: '34px', display: 'flex', flexDirection: 'column', gap: '38px'}}>
                        {linksController.filter(el => el.open).map((el) => {
                            console.log(el)
                            return <SpecialName data={el} key={el.id} fieldStyle={{width: '100%'}}/>
                        })}
                    </Box>}
            </Box>
        }
    />

}