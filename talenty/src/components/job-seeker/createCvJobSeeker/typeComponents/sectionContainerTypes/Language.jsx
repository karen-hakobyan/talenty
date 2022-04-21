import {useDispatch, useSelector} from "react-redux";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import Select from "../../../../../shared/components/Select";
import {setTemplateData} from "../../../../../store/globalData/slice";
import {selectTemplateData} from "../../../../../store/globalData/selector";
import {useMemo} from "react";

export default function Language({data}) {
    const dispatch = useDispatch()
    const templateData = useSelector(selectTemplateData)
    const exactPage = useSelector(state => state.globalData.exactPage)
    //extract submitted values
    const submittedValues = useMemo(() => {
        return templateData.fields[exactPage - 1].fields.filter(el => el.metadata.status !== 'DELETED').reduce((prev, next) => {
            next.fields.forEach(elem => {
                if (data.metadata.submitted_value !== elem.metadata.submitted_value) {
                    prev.push(elem.metadata.submitted_value)
                }
            })
            return prev
        }, [])
    }, [templateData, data, exactPage])

    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                placeHolder={data.metadata.placeholder}
                value={data.metadata.submitted_value}
                menuItems={data.metadata.values.filter(el => !submittedValues.includes(el))}
                onChange={(event) => dispatch(setTemplateData({id: data.id, value: event.target.value}))}
            />
        }
    />
}
