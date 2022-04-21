import Title from "./Title";
import EmploymentTerms from "./EmploymentTerms";
import JobType from "./JobType";
import JobCategory from "./JobCategory";
import CandidateLevel from "./CandidateLevel";
import Country from "./Country";
import City from "./City";
import Section from "./Section";
import ProfessionalSkill from "./ProfessionalSkill";
import Description from "./Description";
import GridSection from "../job-seeker/createCvJobSeeker/typeComponents/sectionContainerTypes/GridSection";
import {memoizeTypeComponents} from "../../helpers/memo";

const announcementTypes = {
    employment_terms: EmploymentTerms,
    title: Title,
    job_type: JobType,
    job_category: JobCategory,
    candidate_level: CandidateLevel,
    country: Country,
    city: City,
    grid_section: GridSection,
    section: Section,
    simple_input: Description,
    description: Description,
    professional_skill: ProfessionalSkill,
    personal_skill: ProfessionalSkill,
}

// memoizing all announcement type components this will solve input bluring issues
export default memoizeTypeComponents(announcementTypes)