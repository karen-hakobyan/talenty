import {Box} from "@mui/material";
import {generalInfoTypes} from "./generalInfoTypes/generalInfoTypes";

export default function GeneralInfo({data}) {
    return <Box>
        {data.fields.map(el => {
            let TempComponent = generalInfoTypes[el.metadata.type]
            if (!TempComponent) {
                return null
            }
            return <TempComponent data={el} generalInfoData={data} key={el.id}/>
        })}
    </Box>
}
