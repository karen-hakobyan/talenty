import {Box, Grid} from "@mui/material";
import {memo} from "react";
import {useDispatch} from "react-redux";
import typeComponents from "./typeComponents/typeComponents";

export default function UserCVBody({data}) {
    const dispatch = useDispatch()
    console.log(data);

    if (!data) {
        return null;
    }
    console.log(data)

    return <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', justifyContent: 'space-between', rowGap: '38px'}}>
        {data?.fields.map((el, index) => {
            let TempComponent = typeComponents[el.metadata.type]
            if (!TempComponent) {
                return null
            }
            TempComponent = memo(TempComponent)
            return (
                // <TempComponent data={el} sx={{display: 'flex', justifyContent: index % 2 !== 0 ? 'flex-end': 'flex-start'}} />
                <Box sx={{display: 'flex', justifyContent: index % 2 !== 0 ? 'flex-end': 'flex-start', width: '100%'}}>
                    <TempComponent data={el} />
                </Box>
            )
        })}
    </Box>;
}
