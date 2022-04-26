import {Box} from "@mui/material";
import {LEFT_TYPES} from "./typesPerName";

export default function Left({data}) {
    return <Box sx={{display: 'grid', gap: '24px'}}>
        {data.map(el => {
            const TempComponent = LEFT_TYPES[el.name]
            return !TempComponent ? null : <TempComponent key={el.id} data={el}/>
        })}
    </Box>
}