import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";

export default function EmploymentTerms({data}) {
    return <JobSeekerSubsection
        label={data.name}
    />
}