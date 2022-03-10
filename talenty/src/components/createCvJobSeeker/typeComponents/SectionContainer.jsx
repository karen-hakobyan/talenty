import {memo, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, IconButton} from "@mui/material";
import {selectSectionContainerController} from "../../../store/globalData/selector";
import {sectionContainerTypes} from "./sectionContainerTypes/types";
import {SelectIconSVG} from "../../../assets/icons/createTemplate";
import {INPUT_VALUE_STYLE} from "../../../shared/styles";
import {setSectionContainerController} from "../../../store/globalData/slice";

export const LINE_TYPES = ['description', 'url']

export default function SectionContainer({data, index, fields}) {
    console.log(fields)
    const dispatch = useDispatch()
    const controller = useSelector(selectSectionContainerController)
    const isActive = useMemo(() => {
        if (!controller) {
            return null
        }
        return controller && controller.activeIndex === index
    }, [controller, index])

    if (!isActive && controller) {
        return (
            <Box sx={{
                width: '100%',
                pl: '14px',
                pr: '14px',
                border: '1px solid #DDDDDD',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '48px',
                cursor: 'pointer',
            }}
                 onClick={() => dispatch(setSectionContainerController({...controller, activeIndex: index}))}
            >
                <Box sx={{...INPUT_VALUE_STYLE}}>{data.fields[0].metadata.submitted_value}</Box>
                <IconButton>
                    <SelectIconSVG />
                </IconButton>
            </Box>
        )
    }
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                rowGap: '38px',
            }}>
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
                        <TempComponent
                            data={el} {...(el.metadata.type === 'simple_evaluate_bar' ? {depend: data.fields[0].metadata.submitted_value} : {})}
                            {...{fields}}
                        />
                    </Box>
                )
            })}
        </Box>
    )
}