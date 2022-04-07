import {Box} from '@mui/material'

export default function VacancyDetails({data}) {
    return <Box sx={{mt: '44px', display: 'flex', flexDirection: 'column', gap: '32px'}}>
        {data.fields.map(el => {
            if (el.metadata.submitted_value) {
                return (
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '24px', color: '#4C494F'}} key={el.id}>
                        <Box sx={{
                            fontFamily: 'Proxima Nova',
                            fontSize: '16px',
                            lineHeight: '22px',
                            fontWeight: 900,
                        }}>
                            {el.name}
                        </Box>
                        <Box sx={{
                            fontFamily: 'Proxima Nova',
                            fontSize: '14px',
                            lineHeight: '20px',
                            fontWeight: 400,
                        }}>
                            {el.metadata.submitted_value}
                        </Box>
                    </Box>
                )
            } else {
                return null
            }
        })}
    </Box>
}