import {memo} from "react";
import {Box} from "@mui/material";
import typeComponents, {TYPES_TAKES_WHOLE_ROW} from "./typeComponents/typeComponents";

export default function UserCVBody({data}) {
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
            return (
                <Box sx={{
                    width: '100%',
                    ...(TYPES_TAKES_WHOLE_ROW.includes(el.metadata.type) || (el.metadata.type === 'section' && el.fields[0].metadata.type !== 'expected_salary') ? {
                        gridColumnStart: 1,
                        gridColumnEnd: 3,
                    } : {display: 'flex', justifyContent: index % 2 !== 0 ? 'flex-end' : 'flex-start'})
                }} key={el.id}>
                    <TempComponent data={el}/>
                </Box>
            )
        })}
    </Box>;
}
