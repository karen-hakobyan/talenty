import {Box} from "@mui/material";
import {PREVIEW_TITLE} from "../constants";

export default function ProfSkills({data}) {
    console.log(data)
    if (data.fields[0].fields.some(el => !el.metadata.submitted_value)) {
        return null
    }
    return <Box sx={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <Box sx={PREVIEW_TITLE}>{data.name}</Box>
        <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
            {data.fields.map(el => {
                const skillName = el.fields[0].metadata.submitted_value
                const values = el.fields[1].metadata.values
                const level = el.fields[1].metadata.submitted_value
                return <Box sx={{display: 'flex', flexDirection: 'column', gap: '2px'}} key={el.id}>
                    <Box sx={{fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '21px'}}>
                        {skillName}
                    </Box>
                    <Box sx={{display: 'flex', gap: '10px'}}>
                        {/*#9B9B9B*/}
                        {/*#4C494F*/}
                        {[1, 2, 3, 4, 5].map((num, index) => {
                            return <Box
                                sx={{
                                    width: '10px',
                                    height: '10px',
                                    background: level && values.findIndex((temp) => temp === level) - 1 >= index ? '#4C494F' : '#9B9B9B'
                                }}
                                key={num}
                            />
                        })}
                    </Box>
                </Box>
            })}
        </Box>
    </Box>
}