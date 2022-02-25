import SOCIAL_LINK_ICONS from "../../cvTemplate/typeComponents/section/socialLinkIcons";
import {memo, useState} from "react";
import {Box} from "@mui/material";
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
    const [links, setLinks] = useState(data.fields.map((el) => ({...el, open: false})));

    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box>
                <Box sx={{display: 'flex', gap: '20px'}}>
                    {links.map(({open, name, id}) => {
                        let Icon = SOCIAL_LINK_ICONS[name]
                        if (!Icon) {
                            return null
                        }
                        Icon = memo(Icon)
                        return <Box key={id} sx={{display: 'flex', alignItems: 'center', gap: '14px'}}>
                            <Icon/>
                            <Checkbox checked={open} onChange={(event) => {
                                setLinks(prev => prev.map(el => ({...el, open: el.id === id ? !el.open : el.open})))
                            }}/>
                        </Box>
                    })}
                </Box>
                {links.some(el => el.open) && <Box sx={{mt: '34px', display: 'flex', flexDirection: 'column', gap: '38px'}}>
                    {links.filter(el => el.open).map((el) => {
                        return <SpecialName data={el} key={el.id}/>
                    })}
                </Box>}
            </Box>
        }
    />

}