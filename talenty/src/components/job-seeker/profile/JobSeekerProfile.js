import {Box} from "@mui/material";
import JobSeekerContainer from "../../shared/JobSeekerContainer";
import {Container} from "./Container";
import TextField from "../../../shared/components/Textfield";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";


export default function JobSeekerProfile() {
    return <JobSeekerContainer>
        <Box sx={{display: 'flex', gap: '20px'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', width: '37.36%'}}>
                <Container title='Main Info'>
                    <Box sx={{display: 'flex', gap: '20px', flexDirection: 'column'}}>
                        <JobSeekerSubsection
                            Component={<TextField sx={{width: '100%'}} placeholder="Your email"/>}
                            label='Email'
                        />
                        <JobSeekerSubsection
                            Component={<TextField sx={{width: '100%'}} placeholder="77 123 456"/>}
                            label='Phone number'
                        />
                        <JobSeekerSubsection
                            Component={<TextField sx={{width: '100%'}} placeholder="your location"/>}
                            label='Location'
                        />
                        <JobSeekerSubsection
                            Component={<TextField sx={{width: '100%'}} placeholder="your location"/>}
                            label='Salary'
                        />
                        <JobSeekerSubsection
                            Component={<TextField sx={{width: '100%'}} placeholder="Language"/>}
                            label='Languages'
                        />
                        <JobSeekerSubsection
                            Component={<TextField sx={{width: '100%'}} placeholder="Language"/>}
                            label='Social Media links'
                        />
                    </Box>
                </Container>
                <Container title='Professional skills'>
                    <JobSeekerSubsection
                        Component={<TextField sx={{width: '100%'}} placeholder="Your email"/>}
                        label='Skill'
                    />
                </Container>
                <Container title='Personal skills'>
                    <JobSeekerSubsection
                        Component={<TextField sx={{width: '100%'}} placeholder="Your email"/>}
                        label='Skill'
                    />
                </Container>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', flex: 1}}>
                <Container title='Preferences'>children</Container>
                <Container title='Work experience'>children</Container>
                <Container title='Education'>children</Container>
                <Container title='Certificate / License'>children</Container>
            </Box>
        </Box>
    </JobSeekerContainer>
}