import Date from "./Date";
import ExpectedSalary from "./ExpectedSalary";
import SalaryType from "./Salary";
import SocialLink from "./SocialLink";

// eslint-disable-next-line
const SUBSECTION_TYPES = {
    currency: SalaryType,
    social_link: SocialLink,
    salary: ExpectedSalary,
    date: Date,
};

export default SUBSECTION_TYPES;
