import {Box} from '@mui/material'
import announcementTypes from "../../../../announcement/announcementTypes";

export default function GridSection({data}) {
    return <Box
        sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            rowGap: '38px',
            columnGap: '38px',
        }}
    >
        {data.fields.map(el => {
            let TempComponent = announcementTypes[el.metadata.type]
            if (!TempComponent) {
                return null
            }
            return <TempComponent data={el} key={el.id}/>
        })}
    </Box>
}
