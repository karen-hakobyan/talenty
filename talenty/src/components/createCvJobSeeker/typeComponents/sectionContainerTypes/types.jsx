import SpecialName from "../SpecialName";
import Section from "./Section";
import DateSubSection from "./DateSubSection";
import CurrentDate from "./CurrentDate";
import Description from "./Description";
import EvaluateBar from "./EvaluateBar";
import LanguageLevelContainer from "./LanguageLevelContainer";
import ProfSkill from "./ProfSkill";
import Language from "./Language";

export const sectionContainerTypes = {
    text: SpecialName,
    section: Section,
    description: Description,
    date: DateSubSection,
    current_date: CurrentDate,
    professional_skill: ProfSkill,
    simple_evaluate_bar: EvaluateBar,
    personal_skill: ProfSkill,
    url: SpecialName,
    language: Language,
    language_evaluate_bar: LanguageLevelContainer,
}