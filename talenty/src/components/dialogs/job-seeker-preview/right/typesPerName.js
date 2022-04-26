import Education from "./Education";
import ProjectProduct from "./ProjectProduct";

export const RIGHT_TYPES = {
    'Education and Training': Education,
    'Work Experience': Education,
    'Projects/Products': ProjectProduct,
    'Publications': () => 'publications',
    'Additional information': () => 'Additional information',
}