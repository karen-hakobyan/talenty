import SpecialName from "./SpecialName";
import Gender from "./Gender";
import Date from './Date'
import Email from "./Email";
import City from "./City";
import Address from "./Address";
import Phone from "./Phone";
import Country from "./Country";
import SectionContainer from "./SectionContainer";
import SubSection from "./sectionContainerTypes/Section";
import Description from "./sectionContainerTypes/Description";
import Section from './Section'
import Photo from "./Photo";
import MilitaryId from "./MilitaryId";
import BasicDatePicker from "../../shared/DatePicker";

const typeComponents = {
    special_name: SpecialName,
    address: Address,
    city: City,
    country: Country,
    date: Date,
    // date: BasicDatePicker,
    email: Email,
    gender: Gender,
    driving_license: MilitaryId,
    military_id: MilitaryId,
    add_photo: Photo,
    section: Section,
    phone_number: Phone,
    description: Description,
    section_container: SectionContainer,
    text: () => null,
};

export const sectionContainerTypes = {
    text: SpecialName,
    section: SubSection,
}

export const TYPES_TAKES_WHOLE_ROW = [
    'section_container',
    'description',
]

export default typeComponents