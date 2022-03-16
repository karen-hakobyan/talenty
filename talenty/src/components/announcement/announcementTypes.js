import Title from "./Title";
import EmploymentTerms from "./EmploymentTerms";
import JobType from "./JobType";
import JobCategory from "./JobCategory";
import CandidateLevel from "./CandidateLevel";
import Country from "./Country";
import City from "./City";
import Section from "./Section";
import SimpleInput from "./SimpleInput";
import ProfessionalSkill from "./ProfessionalSkill";
import Description from "./Description";
import PersonalSkill from "./PersonalSkill";

const announcementTypes = {
    employment_terms: EmploymentTerms,
    title: Title,
    job_type: JobType,
    job_category: JobCategory,
    candidate_level: CandidateLevel,
    country: Country,
    city: City,
    section: Section,
    simple_input: SimpleInput,
    description: Description,
    professional_skill: ProfessionalSkill,
    personal_skill: PersonalSkill,
}

export default announcementTypes