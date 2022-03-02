import CountryCodes from 'country-codes-list'
console.log(CountryCodes.all())
export const COUNTRY_NAMES_LANGUAGE = CountryCodes.all().map(el => el.officialLanguageNameEn)
export const COUNTRY_NAMES = CountryCodes.all().map(el => el.countryNameEn)
