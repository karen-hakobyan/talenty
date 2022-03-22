import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import Select from "../../shared/components/Select";

export default function EmploymentTerms({data}) {
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                value={data.metadata.submitted_value}
                menuItems={data.metadata.values}
                placeHolder={data.metadata.placeholder}
                textFieldWidth="100%"
            />
        }
    />
}


