import {Box} from "@mui/material";
import typeComponents from "../cvTemplate/typeComponents";

export default function UserCVBody({data}) {
    console.log(typeComponents);
    console.log(data);

    if (!data) {
        return null;
    }

    return <Box sx={{display: "flex", width: "100%", flexWrap: "wrap"}}></Box>;
}
