import TextField from "../../../../shared/components/Textfield";
import {Box} from "@mui/material";
import JobSeekerSubsection from "../../JobSeekerSubsection";

export default function EvaluateBar({data}) {
    console.log({eval: data})
    return <JobSeekerSubsection
        label={data.name}
        Component={<Box sx={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
            <Box sx={{position: 'relative'}}>
                <TextField sx={{width: '500px'}} disabled/>
            </Box>
            <Box sx={{display: 'flex', width: '500px', justifyContent: 'space-between'}}>
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