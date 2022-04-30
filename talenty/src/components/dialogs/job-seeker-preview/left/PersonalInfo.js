import {Box} from "@mui/material";
import SOCIAL_LINK_ICONS from "../../../cvTemplate/typeComponents/section/socialLinkIcons";

const PREVIEW_TEXT_STYLE = {
    fontWeight: 400,
    fontFamily: 'Poppins',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#666666',
    maxWidth: '262px',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
}
export default function PersonalInfo({data}) {
    const [firstName, lastName, gender, dateOfBirth, phone, email, country, city, address, salary, other, links] = data.fields
    return <Box sx={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <Box sx={{
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: '42px',
            color: '#323232',
            textAlign: 'center',
            mb: '42px'
        }}>
            {firstName.metadata.submitted_value} {lastName.metadata.submitted_value}
        </Box>
        {
            dateOfBirth.metadata.submitted_value && gender.metadata.submitted_value &&
            <Box sx={PREVIEW_TEXT_STYLE}>
                {dateOfBirth.metadata.submitted_value && dateOfBirth.metadata.submitted_value + ','} {gender.metadata.submitted_value}
            </Box>
        }
        <Box sx={PREVIEW_TEXT_STYLE}>{email.metadata.submitted_value}</Box>
        {phone.metadata.submitted_value && <Box sx={PREVIEW_TEXT_STYLE}>{phone.metadata.submitted_value}</Box>}
        {
            address.metadata.submitted_value || country.metadata.submitted_value || city.metadata.submitted_value ?
                <Box sx={PREVIEW_TEXT_STYLE}>
                    {address.metadata.submitted_value} {country.metadata.submitted_value} {city.metadata.submitted_value}
                </Box> : null
        }
        {
            salary.fields[0].metadata.submitted_value && <Box sx={PREVIEW_TEXT_STYLE}>
                {
                    salary.fields[0].metadata.submitted_value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")
                }
                {
                    salary.fields[1].metadata.submitted_value
                }
            </Box>
        }
        {
            other.fields.some(el => el.metadata.submitted_value) &&
            <Box sx={PREVIEW_TEXT_STYLE}>
                {other.fields[1].metadata.submitted_value === 'Yes' && other.fields[1].name + '-Yes'}{' '}
                {other.fields[2].metadata.submitted_value === 'Yes' && other.fields[2].name + '-Yes'}
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