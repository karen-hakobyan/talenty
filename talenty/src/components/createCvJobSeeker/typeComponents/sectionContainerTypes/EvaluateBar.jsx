import {Box} from "@mui/material";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import {useEffect, useMemo, useRef, useState} from "react";

const setExactWidth = (width, widths) => {
    for(let i = 0; i < widths.length - 1; i++) {
        if(width > widths[i].width && width < widths[i + 1].width) {
            return widths[i + 1].width;
        }
    }
}
export default function EvaluateBar({data}) {
    console.log(data)
    const ref = useRef()
    let [childWidth, setChildWidth] = useState(0)
    let widths = useMemo(() => {
        let unitWidth = 500 / (data.fields.length - 1);
        let result = []
        data.fields.forEach(({name}, index) => {
            result.push({name, width: index * unitWidth})
        })
        return result
    },[data])

    return <JobSeekerSubsection
        label='Percentage'
        Component={<Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
            <Box ref={ref} sx={{position: 'relative',width: '500px', height: '40px',border: '1px solid #D9D9D9'}} onClick={(event) => {
                setChildWidth(setExactWidth(event.clientX - ref.current.offsetLeft, widths))
            }}>
                <Box sx={{height: '38px', width: `${childWidth}px`, background: '#8C0DF0'}} />
            </Box>
            <Box sx={{display: 'flex', width: '500px', gap: '72px'}}>
                {data.fields.map(el => {
                    return <Box
                        sx={{fontSize: '14px', lineHeight: '24px', fontFamily: 'Proxima Nova'}}
                        key={el.name}
                    >
                        {el.name}
                    </Box>
                })}
            </Box>
        </Box>}
    />
}