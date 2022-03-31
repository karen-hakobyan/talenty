import {Box} from '@mui/material'
import {DIALOG_TITLE_COLOR} from "../../../constants/colors";

export default function Skill({data}) {
    console.log({skill: data})
    return <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
        {data.fields.map(el => {
            if (!el.metadata.submitted_value) {
                return null
            }
            let list = el.metadata.submitted_value.split("$$")
            return <Box sx={{display: 'flex', flexDirection: 'column', gap: '27px', mt: '32px'}}>
                <Box sx={{
                    fontSize: '16px',
                    lineHeight: '18px',
                    color: '#4C494F',
                    fontFamily: 'Proxima Nova',
                    fontWeight: 900
                }}>
                    {el.name}
                </Box>
                <Box sx={{display: 'flex', gap: '14px'}}>
                    {
                        list.map(val => {
                            return <Box key={val} sx={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: DIALOG_TITLE_COLOR,
                                color: 'white',
                                fontSize: "8px",
                                fontFamily: 'Proxima Nova',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 900,
                            }}>
                                <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                    {val.split(' ').map(el => {
                                        return <Box>{el}</Box>
                                    })}
                                </Box>
                            </Box>
                        })
                    }
                </Box>
            </Box>
        })}
    </Box>
}