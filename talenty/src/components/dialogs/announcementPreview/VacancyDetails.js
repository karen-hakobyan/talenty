import {Box} from '@mui/material'
import MUIRichTextEditor from "mui-rte";

export default function VacancyDetails({data}) {
    return <Box sx={{mt: '44px', display: 'flex', flexDirection: 'column', gap: '32px'}}>
        {data.fields.map(el => {
            if (el.metadata.submitted_value) {
                return (
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '24px', color: '#4C494F'}} key={el.id}>
                        <Box sx={{
                            fontFamily: "Poppins",
                            fontSize: '16px',
                            lineHeight: '18px',
                            fontWeight: 900,
                        }}>
                            {el.name}
                        </Box>
                        <Box sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: '14px',
                            lineHeight: '20px',
                            fontWeight: 400,
                        }}>
                            {/*{el.metadata.submitted_value}*/}
                            {el.metadata.required ? el.metadata.submitted_value :
                                <Box sx={{mt: '-8px', pl: '31px'}}>
                                    <MUIRichTextEditor
                                        readOnly
                                        defaultValue={el.metadata.submitted_value}
                                        controls={[]}
                                    />
                                </Box>
                            }
                        </Box>
                    </Box>
                )
            } else {
                return null
            }
        })}
    </Box>
}