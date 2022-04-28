import { useEffect, useState } from 'react';
import {Box} from '@mui/material'
import {sectionContainerTypes} from "./types";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import { validetionDate } from '../../../../../helpers/validation/validation';

export default function Section({data}) {
    // console.log(data)
    const [start,end,stillWorking] = data.fields
    const [err, setErr]= useState({
        error: false,
        massage: ""
    })
    useEffect(()=>{
        setErr(validetionDate({
            startValue:start.metadata.submitted_value?start.metadata.submitted_value:"",
            endValue:end.metadata.submitted_value?end.metadata.submitted_value:"",
            isStillWorking:stillWorking.metadata.submitted_value?stillWorking.metadata.submitted_value:false
        }))
    },[start,end,stillWorking])

    return <Box sx={{width: '500px'}}>
        <JobSeekerSubsection
            label={data.name}
            Component={
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                    {data.fields.map((el, index) => {
                        let TempComponent = sectionContainerTypes[el.metadata.type]
                        if (!TempComponent) {
                            return null
                        }
                        return (
                            <Box
                                key={el.id}
                                sx={{
                                    ...(el.metadata.type === 'description' ?
                                        {gridColumnStart: 1, gridColumnEnd: 3} :
                                        {
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                                        })
                                }}
                            >
                                <TempComponent
                                    err={err}
                                    data={el}
                                    {
                                        ...(['To', 'End'].includes(el.name) ?
                                            {extra: data.fields.find(el => ['Still studying', 'Still working', 'Still processing'].includes(el.name))} :
                                            {})
                                    }
                                />
                            </Box>
                        )
                    })}
                </Box>
            }
            sx={{width: '100%'}}
        />
    </Box>
}
