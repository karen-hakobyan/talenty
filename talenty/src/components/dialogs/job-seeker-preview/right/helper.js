import {Box} from "@mui/material";

export function publicationMap(el) {
    return (<Box
        key={el.id}
        sx={{fontSize: '12px', lineHeight: '18px', fontWeight: 400, color: '#4C494F'}}
    >
        {el.fields[0].metadata.submitted_value} {'  '}{el.fields[1].metadata.submitted_value &&
        <span onClick={() => {
            window.open(el.fields[1].metadata.submitted_value)
        }} style={{
            color: '#9B9B9B',
            fontSize: '12px',
            textDecoration: 'underline',
            cursor: 'pointer'
        }}>{el.fields[1].metadata.submitted_value}</span>}
    </Box>)
}