import AddressGenerator from "./address";
import CityGenerator from "./city";
import CountryGenerator from "./country";
import DateGenerator from "./date";
import EmailGenerator from "./email";
import GenderGenerator from "./gender";
import LicenseGenerator from "./license";
import MilitaryGenerator from "./military";
import PhoneGenerator from "./phoneNumber";
import PhotoGenerator from "./photo";
import SectionGenerator from "./section";
import SpecialNameGenerator from "./specialName";

const typeComponents = {
    special_name: SpecialNameGenerator,
    address: AddressGenerator,
    city: CityGenerator,
    country: CountryGenerator,
    date: DateGenerator,
    email: EmailGenerator,
    gender: GenderGenerator,
    driving_license: LicenseGenerator,
    military_id: MilitaryGenerator,
    add_photo: PhotoGenerator,
    section: SectionGenerator,
    phone_number: PhoneGenerator,
};

export default typeComponents;