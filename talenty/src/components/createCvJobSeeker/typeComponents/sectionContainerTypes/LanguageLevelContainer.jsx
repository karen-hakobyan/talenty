import {Box} from "@mui/material";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import Button from "../../../../shared/components/Button";

export default function LanguageLevelContainer({data}) {
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box sx={{display: 'flex', width: '500px', gap: '16px'}}>
                {data.fields.map(el => <Button
                    key={el.id}
                    sx={{width: '156px', color: '#8C8C8C', border: '1px solid #8C8C8C'}}
                >
                    {el.name}
                </Button>
                )}
            </Box>
        }
    />
}