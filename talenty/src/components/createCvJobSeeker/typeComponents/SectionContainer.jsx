import {Box} from "@mui/material";
import {sectionContainerTypes} from "./sectionContainerTypes/types";
import {memo} from "react";

export default function SectionContainer({data}) {
    return <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',rowGap: '38px'}}>
        {data.fields.map((el, index) => {
            let TempComponent = sectionContainerTypes[el.metadata.type]
            if (!TempComponent) {
                return null
            }
            TempComponent = memo(TempComponent)
            return (
                <Box sx={el.metadata.type === 'description' ? {
                    gridColumnStart: 1,
                    gridColumnEnd: 3
                } : {display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end'}} key={el.id}>
                    <TempComponent data={el} />
                </Box>
            )
        })}
    </Box>
}