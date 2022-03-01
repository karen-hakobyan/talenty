import {memo, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Box, MenuItem} from "@mui/material";
import {selectLinksController} from "../../../store/globalData/selector";
import {setLinksController, setTemplateData} from "../../../store/globalData/slice";
import SOCIAL_LINK_ICONS from "../../cvTemplate/typeComponents/section/socialLinkIcons";
import {Checkbox} from "../../shared/Checkbox";
import JobSeekerSubsection from "../JobSeekerSubsection";
import SpecialName from "./SpecialName";
import TextField from "../../../shared/components/Textfield";

const salaryTypes = {
    expected_salary: Salary,
    salary_type: SalaryType,
}
export default function Section({data}) {
    if (data.fields[0].metadata.type === 'social_link') {
        return <SocialMedia {...{data}} />
    }
    if (data.fields[0].metadata.type === 'expected_salary') {
        return <ExpectedSalary {...{data}} />
    }
}

function ExpectedSalary({data}) {
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box sx={{display: 'flex', gap: '16px'}}>
                {
                    data.fields.map(el => {
                        let TempComponent = salaryTypes[el.metadata.type]
                        if (!TempComponent) {
                            return null
                        }
                        TempComponent = memo(TempComponent)
                        return <TempComponent data={el} key={el.id}/>
                    })
                }
            </Box>

        }
    />
}

function SocialMedia({data}) {
    const dispatch = useDispatch()
    const linksController = useSelector(selectLinksController)
    useEffect(() => {
        if (linksController === null) {
            dispatch(setLinksController(data.fields.map((el) => ({...el, open: false}))))
        }
    }, [dispatch, linksController, data])
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box>
                <Box sx={{display: 'flex', gap: '20px'}}>
                    {linksController?.map(({open, name, id}) => {
                        let Icon = SOCIAL_LINK_ICONS[name]
                        if (!Icon) {
                            return null
                        }
                        Icon = memo(Icon)
                        return <Box key={id} sx={{display: 'flex', alignItems: 'center', gap: '14px'}}>
                            <Icon/>
                            <Checkbox checked={open} onChange={() => {
                                dispatch(setLinksController(linksController.map(el => ({
                                    ...el,
                                    open: el.id === id ? !el.open : el.open
                                }))))
                            }}/>
                        </Box>
                    })}
                </Box>
                {linksController?.some(el => el.open) &&
                    <Box sx={{mt: '34px', display: 'flex', flexDirection: 'column', gap: '38px'}}>
                        {linksController.filter(el => el.open).map((el) => {
                            const temp = data.fields.find(dataEl => dataEl.id === el.id)
                            return <SpecialName data={temp} key={el.id} fieldStyle={{width: '100%'}}/>
                        })}
                    </Box>}
            </Box>
        }
    />
}

function Salary({data}) {
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const dispatch = useDispatch()

    return <TextField
        sx={{width: '384px'}}
        onChange={(e) => {
            if (!isNaN(+e.target.value) && e.target.value !== ' ') {
                setValue(e.target.value)
            }
        }}
        value={value}
        onBlur={() => {
            dispatch(setTemplateData({id: data.id, value}))
        }}
    />
}

function SalaryType({data}) {
    return <TextField
        value={data.metadata.submitted_value}
        select
        sx={{width: '100px'}}
    >
        {
            data.metadata.values ?
                data.metadata.values.map(el => <MenuItem value={el} key={el}>{el}</MenuItem>) :
                <MenuItem value={data.metadata.submitted_value}>{data.metadata.submitted_value}</MenuItem>
        }
    </TextField>
}