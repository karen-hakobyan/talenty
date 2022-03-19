import {memo, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Box} from "@mui/material";
import {selectLinksController} from "../../../store/globalData/selector";
import {setLinksController, setTemplateData} from "../../../store/globalData/slice";
import SOCIAL_LINK_ICONS from "../../cvTemplate/typeComponents/section/socialLinkIcons";
import {Checkbox} from "../../shared/Checkbox";
import JobSeekerSubsection from "../JobSeekerSubsection";
import SpecialName from "./SpecialName";
import TextField from "../../../shared/components/Textfield";
import MilitaryId from "./MilitaryId";
import Photo from "./Photo";
import Select from "../../../shared/components/Select";

const salaryTypes = {
    salary: Salary,
    currency: SalaryType,
}
const licensesTypes = {
    driving_license: MilitaryId,
    military_id: MilitaryId,
    add_photo: Photo,
}
export default function Section({data}) {
    if (data.fields[0].metadata.type === 'social_link') {
        return <SocialMedia {...{data}} />
    }
    if (data.fields[0].metadata.type === 'salary') {
        return <ExpectedSalary {...{data}} />
    }
    return <PhotoLicenses {...{data}}/>
}

function PhotoLicenses({data}) {
    return <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        {data.fields.map(el => {
            let TempComponent = licensesTypes[el.metadata.type]
            TempComponent = memo(TempComponent)
            return <TempComponent data={el} key={el.name}/>
        })}
    </Box>
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
                        return <TempComponent data={el} key={el.id}  />
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
        placeholder={data.metadata.placeholder}
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
    const dispatch = useDispatch()
    return (
        <Select
            value={data.metadata.submitted_value} menuItems={data.metadata.values}
            textFieldWidth="100px"
            onChange={(event) => {
                dispatch(setTemplateData({id: data.id, value: event.target.value}))
            }}
        />
    )
}
