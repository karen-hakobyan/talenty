import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import Select from "../../shared/components/Select";

export default function EmploymentTerms({data}) {
    console.log({empoy: data.metadata.values})
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                placeHolder={data.metadata.placeholder}
                value={data.metadata.submitted_value}
                menuItems={data.metadata.values}
                textFieldWidth="320px"
            />
        }
    />
}
