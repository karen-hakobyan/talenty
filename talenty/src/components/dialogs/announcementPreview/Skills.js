import {Box} from '@mui/material'
import {DIALOG_TITLE_COLOR, TEXT} from "../../../style/colors";

export default function Skill({data}) {
    return <Box sx={{display: 'flex', flexDirection: 'column', gap: '18px'}}>
        {data.fields.map((el) => {
            if (!el.metadata.submitted_value) {
                return null
            }
            let list = el.metadata.submitted_value.split("&&")
            return <Box sx={{display: 'flex', flexDirection: 'column', gap: '27px', mt: '32px', color: TEXT}}
                        key={el.id}>
                <Box sx={{
                    fontFamily: "Poppins",
                    fontSize: '16px',
                    lineHeight: '18px',
                    fontWeight: 900,
                }}>
                    {el.name}
                </Box>
                <Box sx={{display: 'flex', gap: '14px'}}>
                    {
                        list.map((val, index) => {
                            return <Box key={index} sx={{
                                width: '121px',
                                height: '24px',
                                borderRadius: '50px',
                                background: DIALOG_TITLE_COLOR,
                                color: 'white',
                                fontSize: "8px",
                                fontFamily: "'Poppins', sans-serif",
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                lineHeight: '12px',
                                fontWeight: 900,
                            }}>
                                {val}
                            </Box>
                        })
                    }
                </Box>
            </Box>
        })}
    </Box>
}
