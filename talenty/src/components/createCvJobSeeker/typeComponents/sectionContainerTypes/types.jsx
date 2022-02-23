import SpecialName from "../SpecialName";
import Section from "./Section";
import DateSubSection from "./DateSubSection";
import CurrentDate from "./CurrentDate";
import Description from "./Description";

export const sectionContainerTypes = {
    text: SpecialName,
    section: Section,
    description: Description,
    date: DateSubSection,
    current_date: CurrentDate,
}