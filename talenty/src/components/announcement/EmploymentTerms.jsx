import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import Select from "../../shared/components/Select";

export default function EmploymentTerms({data}) {
    console.log({empoy: data.metadata.values})
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                value={data.metadata.submitted_value}
                menuItems={data.metadata.values}
                placeHolder={data.name}
                textFieldWidth="320px"
            />
        }
    />
}