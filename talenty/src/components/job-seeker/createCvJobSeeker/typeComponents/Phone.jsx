import {useState} from "react";
import {useDispatch} from "react-redux";
import TextField from "../../../../shared/components/Textfield";
import SubSection from "../../../shared/subSection";
import {setTemplateData} from "../../../../store/globalData/slice";
import {isValidPhoneNumber} from "../../../../helpers/actions";

export default function Phone({data}) {
    let [value, setValue] = useState(data.metadata.submitted_value || '')
    const dispatch = useDispatch()
    return <SubSection
        label={data.name}
        inputComponent={
            <TextField
                placeholder={data.metadata.placeholder}
                sx={{
                    width: '500px',
                }}
                FormHelperTextProps={{
                    sx:{fontFamily: "'Poppins', sans-serif"}
                }}
                InputProps={{
                    sx: {
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "16px",
                        lineHeight: "24px"
                    }
                }}
                value={value}
                onChange={(event) => {
                    if (isValidPhoneNumber(event.target.value)) {
                        setValue(event.target.value)
                    }
                }}
                onBlur={() => {
                    dispatch(setTemplateData({id: data.id, value}))
                }}
                // InputProps={{
                //     startAdornment: <Select
                //         menuItems={[]}
                //         onChange={(event) => dispatch(setTemplateData({id: data.id, value: event.target.value}))}
                //         fieldStyle={{
                //             '.MuiOutlinedInput-notchedOutline': {
                //                 border: 'none'
                //             },
                //             width: '44px',
                //         }}
                //     />
                // }}
            />
        }
    />
}
