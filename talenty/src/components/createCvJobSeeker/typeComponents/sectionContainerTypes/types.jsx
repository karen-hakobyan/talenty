import SpecialName from "../SpecialName";
import Section from "./Section";
import DateSubSection from "./DateSubSection";
import CurrentDate from "./CurrentDate";
import Description from "./Description";
import EvaluateBar from "./EvaluateBar";
import LanguageLevelContainer from "./LanguageLevelContainer";

export const sectionContainerTypes = {
    text: SpecialName,
    section: Section,
    description: Description,
    date: DateSubSection,
    current_date: CurrentDate,
    professional_skill: SpecialName,
    evaluate_bar: EvaluateBar,
    personal_skill: SpecialName,
    language_level_container: LanguageLevelContainer,
}