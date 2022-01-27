import AddressGenerator from "./address";
import CityGenerator from "./city";
import CountryGenerator from "./country";
import DateGenerator from "./date";
import { DescriptionGenerator } from "./description";
import EmailGenerator from "./email";
import GenderGenerator from "./gender";
import PhoneGenerator from "./phoneNumber";
import PhotoGenerator from "./photo";
import SpecialNameGenerator from "./specialName";
import SectionGenerator from "./section/index.jsx";

const typeComponents = {
    special_name: SpecialNameGenerator,
    address: AddressGenerator,
    city: CityGenerator,
    country: CountryGenerator,
    date: DateGenerator,
    email: EmailGenerator,
    gender: GenderGenerator,
    driving_license: PhotoGenerator,
    militaryid: PhotoGenerator,
    add_photo: PhotoGenerator,
    section: SectionGenerator,
    phone_number: PhoneGenerator,
    description: DescriptionGenerator,
};

export default typeComponents;