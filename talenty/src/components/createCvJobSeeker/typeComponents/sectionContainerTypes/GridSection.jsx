import {Box} from '@mui/material'
import announcementTypes from "../../../announcement/announcementTypes";
import {memo} from "react";

export default function GridSection({data}) {
    console.log(data)
    return <Box
        sx={{width: '100%', background: 'red', height: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)'}}
    >
        {data.fields.map(el => {
            let TempComponent = announcementTypes[el.metadata.type]
            if (!TempComponent) {
                return null
            }
            TempComponent = memo(TempComponent)
            return <TempComponent data={el}/>
        })}
    </Box>
}