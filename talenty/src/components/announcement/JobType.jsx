import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import Select from "../../shared/components/Select";

export default function JobType({data}) {
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                value={data.metadata.submitted_value}
                textFieldWidth="100%"
                menuItems={data.metadata.values}
                placeHolder={data.metadata.placeholder}
            />
        }
    />
}
