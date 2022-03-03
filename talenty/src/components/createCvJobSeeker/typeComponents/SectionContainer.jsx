import {memo, useEffect} from "react";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {sectionContainerTypes} from "./sectionContainerTypes/types";
import {selectSectionContainerController} from "../../../store/globalData/selector";

export const LINE_TYPES = ['description', 'url']

export default function SectionContainer({data}) {
    const controller = useSelector(selectSectionContainerController)
    useEffect(() => {

    },[data])
    return controller ? null : <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', rowGap: '38px'}}>
        {data.fields.map((el, index) => {
            let TempComponent = sectionContainerTypes[el.metadata.type]
            if (!TempComponent) {
                return null
            }
            TempComponent = memo(TempComponent)
            return (
                <Box sx={LINE_TYPES.includes(el.metadata.type) ? {
                    gridColumnStart: 1,
                    gridColumnEnd: 3
                } : {display: 'flex', justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end'}} key={el.id}>
                    <TempComponent data={el}/>
                </Box>
            )
        })}
    </Box>
}