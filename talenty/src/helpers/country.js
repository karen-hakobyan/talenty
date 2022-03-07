import CountryCodes from 'country-codes-list'
export const COUNTRY_NAMES_LANGUAGE = [...(new Set(CountryCodes.all().map(el => el.officialLanguageNameEn)))]
export const COUNTRY_NAMES = CountryCodes.all().map(el => el.countryNameEn)
