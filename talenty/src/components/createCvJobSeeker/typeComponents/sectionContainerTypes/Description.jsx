import JobSeekerSubsection from "../../JobSeekerSubsection";
import {TextField} from "@mui/material";

export default function Description({data}) {
    return <JobSeekerSubsection
        label={data.name}
        Component={<TextField
            placeholder={data?.name}
            variant="outlined"
            multiline
            rows={4}
        />}
    />
}