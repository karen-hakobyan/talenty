import {Box} from "@mui/material";
import SharedTemplateHeader from "../../../shared/components/TemplateHeader";

export function Container({children, title = 'title'}) {
    return <Box sx={{
        p: '30px 24px', width: '100%', boxShadow: '0px 0px 16px rgba(47, 47, 47, 0.1)',
        borderRadius: '2px'
    }}>
        <SharedTemplateHeader title={title}/>
        <Box sx={{mt: '20px'}}>
            {children}
        </Box>
    </Box>
}