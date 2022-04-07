import {Box} from "@mui/material";
import JobSeekerSubsection from "../JobSeekerSubsection";
import {AddPhotoCameraSVG, AddPhotoSVG} from "../../../assets/icons/jobseeker";

export default function Photo({data}) {
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box sx={{width: '106px', height: '106px', background: '#C4C4C4'}}>
                <Box sx={{
                    width: '100%',
                    height: '73px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                    <AddPhotoSVG/>
                </Box>
                <Box sx={{
                    width: '100%',
                    height: '33px',
                    background: '#5C5F6C42',
                    opacity: '26%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: '4px',
                        fontSize: '10px',
                        lineHeight: '12px',
                        fontWeight: 400,
                        fontFamily: "'Poppins', sans-serif",
                        color: '#4C494F',
                    }}>Add Profile Photo<AddPhotoCameraSVG/></Box>
                </Box>
            </Box>
        }
    />
}