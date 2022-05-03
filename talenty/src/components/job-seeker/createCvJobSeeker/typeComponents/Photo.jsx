import {Box} from "@mui/material";
import JobSeekerSubsection from "../JobSeekerSubsection";
import {PhotoUser, CameraJobSeeker} from "../../../../assets/icons/jobseeker";
import {MAIN_PURPLE} from "../../../../style/colors";

export default function Photo({data}) {
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box sx={{
                width: '106px',
                height: '106px',
                background: MAIN_PURPLE,
                borderRadius: '16px',
                position: 'relative'
            }}>
                <CameraJobSeeker style={{position: 'absolute', left: '86px', top: '12px'}}/>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    mt: '17px',
                    mb: '3.4px'
                }}>
                    <PhotoUser/>
                </Box>
                <Box sx={{
                    width: '100%',
                    height: '33px',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(92, 95, 108, 0.26)',
                    fontSize: '10px',
                    lineHeight: '15px',
                    color: '#FFFFFF',
                }}>
                    Add Profile Photo
                </Box>
            </Box>
        }
    />
}