import {Box} from "@mui/material";
import {MAIN_PURPLE} from "../../../../constants/colors";
import SOCIAL_LINK_ICONS from "../../../cvTemplate/typeComponents/section/socialLinkIcons";

const PREVIEW_TEXT_STYLE = {
    fontWeight: 500,
    fontFamily: 'Poppins',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#666666',
    maxWidth: '262px',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
}
export default function PersonalInfo({data}) {
    const [firstName, lastName, gender, dateOfBirth, phone, email, country, city, address, salary, other, links] = data.fields
    return <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{width: '180px', height: '180px', background: MAIN_PURPLE, borderRadius: '50%'}}/>
        </Box>
        <Box sx={{
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: '42px',
            color: '#323232',
            textAlign: 'center',
        }}>
            {firstName.metadata.submitted_value} {lastName.metadata.submitted_value}
        </Box>
        <Box sx={PREVIEW_TEXT_STYLE}>
            {dateOfBirth.metadata.submitted_value} {gender.metadata.submitted_value}
        </Box>
        <Box sx={PREVIEW_TEXT_STYLE}>{email.metadata.submitted_value}</Box>

        <Box sx={PREVIEW_TEXT_STYLE}>
            {address.metadata.submitted_value} {country.metadata.submitted_value} {city.metadata.submitted_value}
        </Box>
        {salary.fields[0].metadata.submitted_value && <Box sx={PREVIEW_TEXT_STYLE}>
            {salary.fields[0].metadata.submitted_value} {salary.fields[1].metadata.submitted_value}
        </Box>}
        {
            other.fields.some(el => el.metadata.submitted_value) &&
            <Box sx={PREVIEW_TEXT_STYLE}>
                {other.fields[1].metadata.submitted_value && other.fields[1].name + '-Yes'}{' '}
                {other.fields[2].metadata.submitted_value && other.fields[2].name + '-Yes'}
            </Box>
        }
        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '24px', mt: '12px'}}>
            {links.fields.map(el => {
                if (!el.metadata.submitted_value) {
                    return null
                }
                let Icon = SOCIAL_LINK_ICONS[el.name]
                return (
                    <Box
                        sx={{cursor: 'pointer'}}
                        onClick={
                            () => {
                                window.open(el.metadata.submitted_value, '_blank')
                            }
                        }
                        key={el.metadata.submitted_value}
                    >
                        <Icon/>
                    </Box>
                )
            })}
        </Box>
    </Box>
}