import {Box} from "@mui/material";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import {useEffect, useMemo, useRef, useState} from "react";
import {setEvaluateWidths, setTemplateData} from "../../../../store/globalData/slice";
import {useDispatch, useSelector} from "react-redux";
import {selectEvaluatesBarWidths} from "../../../../store/globalData/selector";

const setExactWidth = (width, widths) => {
    console.log(widths)
    for (let i = 0; i < widths.length - 1; i++) {
        if (width > widths[i].width && width < widths[i + 1].width) {
            return widths[i + 1].name;
        }
    }
}
export default function EvaluateBar({data}) {
    const ref = useRef()
    const dispatch = useDispatch()
    const evaluateWidths = useSelector(selectEvaluatesBarWidths);
    let childWidth = useMemo(() => {
        if (!data.metadata.submitted_value || !evaluateWidths) {
            return 0
        }
        return evaluateWidths.find(el => el.name === data.metadata.submitted_value).width
    }, [data, evaluateWidths])
    useEffect(() => {
        if (evaluateWidths || !data.metadata.values) {
            return
        }
        if (evaluateWidths === null) {
            let unitWidth = 500 / (data.metadata.values.length - 1);
            let result = []
            data.metadata.values.forEach((el, index) => {
                result.push({name: el, width: index * unitWidth})
            })
            dispatch(setEvaluateWidths(result))
        }
    }, [data, evaluateWidths, dispatch])

    return <JobSeekerSubsection
        label='Percentage'
        Component={<Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
            <Box ref={ref} sx={{position: 'relative', width: '500px', height: '40px', border: '1px solid #D9D9D9'}}
                 onClick={(event) => {
                     dispatch(setTemplateData({
                         id: data.id,
                         value: setExactWidth(event.clientX - ref.current.offsetLeft, evaluateWidths)
                     }))
                 }}>
                <Box sx={{height: '38px', width: `${childWidth}px`, background: '#8C0DF0'}}/>
            </Box>
            <Box sx={{display: 'flex', width: '500px', gap: '72px'}}>
                {data.metadata.values.map(el => {
                    return <Box
                        sx={{fontSize: '14px', lineHeight: '24px', fontFamily: 'Proxima Nova'}}
                        key={el}
                    >
                        {el}
                    </Box>
                })}
            </Box>
        </Box>}
    />
}