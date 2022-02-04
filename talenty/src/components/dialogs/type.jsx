import Body from "./Body";
import SetIsCompany from "./setIsCompany";

export const dialogTypes = {
  setIsCompany: ({ ...props } = {}) => ({ component: SetIsCompany, props }),
  body: ({ ...props }) => ({ component: Body, props }),
};
