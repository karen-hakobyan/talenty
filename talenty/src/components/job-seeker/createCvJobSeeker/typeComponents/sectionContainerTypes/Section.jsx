import {Box} from '@mui/material'
import {sectionContainerTypes} from "./types";
import JobSeekerSubsection from "../../JobSeekerSubsection";

export default function Section({data}) {
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