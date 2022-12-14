import {Box} from '@mui/material'
import {DIALOG_TITLE_COLOR} from "../../../../style/colors";

export default function GridSection({data}) {
    return <Box
        sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            alignContent: 'space-around',
            rowGap: '24px',
            mt: '64px',
        }}>
        {data.fields.map(el => {
            if (!el.metadata.submitted_value) {
                return null
            }
            return (
                <Box sx={{display: 'flex', gap: '4px', alignItems: 'center'}} key={el.id}>
                    <Box sx={{width: '25px', height: '25px', borderRadius: '50%', background: DIALOG_TITLE_COLOR}}/>
                    <Box sx={{fontWeight: 400, fontFamily: "'Poppins', sans-serif"}}>
                        {`${el.name}: ${el.metadata.submitted_value || ''}`}
                    </Box>
                </Box>
            )
        })}
    </Box>
}