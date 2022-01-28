import Body from "./Body";
import SetIsCompany from "./setIsCompany";

export const dialogTypes = {
  setIsCompany: SetIsCompany,
  body: ({ dialogData, attentionIsOpen, setAttentionIsOpen }) => (
    <Body {...{ dialogData, attentionIsOpen, setAttentionIsOpen }} />
  ),
};
