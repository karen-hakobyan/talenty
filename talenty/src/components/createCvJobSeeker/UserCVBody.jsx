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

    return <Box
        sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', justifyContent: 'space-between', rowGap: '38px'}}>
        {data?.fields.map((el, index) => {
            let TempComponent = typeComponents[el.metadata.type]
            if (!TempComponent) {
                return null
            }
            TempComponent = memo(TempComponent)
            console.log(el)
            return (
                <Box sx={{
                    width: '100%',
                    ...(el.metadata.type === 'section_container' ? {
                        gridColumnStart: 1,
                        gridColumnEnd: 3
                    } : {display: 'flex', justifyContent: index % 2 !== 0 ? 'flex-end' : 'flex-start'})
                }} key={el.id}>
                    <TempComponent data={el}/>
                </Box>
            )
        })}
    </Box>;
}
