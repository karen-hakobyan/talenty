import Select from "../../../shared/Select";

export default function Date({ data }) {
  return <Select disabled sx={{ width: "202px" }} placeHolder={data.name} />;
}
