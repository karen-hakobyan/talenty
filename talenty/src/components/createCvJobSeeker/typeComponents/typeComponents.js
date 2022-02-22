import SpecialName from "./SpecialName";
import Gender from "./Gender";
import Date from './Date'
import Email from "./Email";
import City from "./City";
import Address from "./Address";
import Phone from "./Phone";
import Country from "./Country";

const typeComponents = {
    special_name: SpecialName,
    address: Address,
    city: City,
    country: Country,
    date: Date,
    email: Email,
    gender: Gender,
    driving_license: () => null,
    military_id: () => null,
    add_photo: () => null,
    section: () => null,
    phone_number: Phone,
    description: () => null,
    section_container: () => null,
    text: () => null,
    professional_skill: () => null,
    evaluate_bar: () => null,
    personal_skill: () => null,
    language_level_container: () => null,
    url: () => null,
};

export default typeComponents