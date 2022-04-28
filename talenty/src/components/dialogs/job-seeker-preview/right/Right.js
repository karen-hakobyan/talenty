import {Box} from "@mui/material";
import {RIGHT_TYPES} from "./typesPerName";

export default function Right({data}) {
    console.log({right: data})

    return <Box sx={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        {
            data.map(el => {
                let TempComponent = RIGHT_TYPES[el.name]
                console.log({name: el.name, TempComponent})
                if (!TempComponent) {
                    return null
                }
                return <TempComponent key={el.id} data={el}/>
            })
        }
    </Box>
}