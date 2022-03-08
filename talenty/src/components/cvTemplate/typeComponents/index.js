import AddressGenerator from "./address";
import CityGenerator from "./city";
import CountryGenerator from "./country";
import DateGenerator from "./date";
import {DescriptionGenerator} from "./description";
import EmailGenerator from "./email";
import GenderGenerator from "./gender";
import PhoneGenerator from "./phoneNumber";
import SpecialNameGenerator from "./specialName";
import SectionGenerator from "./section";
import SectionContainer from "./section_container";
import EveluateBar from "./evaluate_bar";
import LanguageLevelGenerator from "./language_level_container";

const typeComponents = {
    special_name: SpecialNameGenerator,
    address: AddressGenerator,
    city: CityGenerator,
    country: CountryGenerator,
    date: DateGenerator,
    email: EmailGenerator,
    gender: GenderGenerator,
    section: SectionGenerator,
    phone_number: PhoneGenerator,
    description: DescriptionGenerator,
    section_container: SectionContainer,
    text: SpecialNameGenerator,
    professional_skill: SpecialNameGenerator,
    simple_evaluate_bar: EveluateBar,
    personal_skill: SpecialNameGenerator,
    language_evaluate_bar: LanguageLevelGenerator,
    language: SpecialNameGenerator,
    url: SpecialNameGenerator,
    simple_input: DescriptionGenerator,
};

export default typeComponents;