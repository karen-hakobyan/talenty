import {selectTemplateData} from "../../../store/globalData/selector";
import {useDispatch, useSelector} from "react-redux";
import {TEMPLATE_BUTTON_ADD} from "../../../shared/styles";
import {addSectionContainerAction, setSectionContainerController} from "../../../store/globalData/slice";
import Button from "../../../shared/components/Button";
import {useMemo} from "react";

const ADDABLE_SECTION_NAMES = ['Professional skills', 'Personal skills', 'Languages']
export default function AddButton() {
    const templateData = useSelector(selectTemplateData)
    const exactPage = useSelector((state) => state.globalData.exactPage)
    const dispatch = useDispatch()
    const currentData = templateData?.fields[exactPage - 1]
    const button = useMemo(() => {
        return <Button
            sx={{...TEMPLATE_BUTTON_ADD, color: "#8C0DF0"}}
            onClick={() => {
                dispatch(addSectionContainerAction(templateData.fields[exactPage - 1].id))
                dispatch(setSectionContainerController(null))
            }}
        >
            Add
        </Button>
    }, [dispatch, templateData, exactPage])
    if (currentData.fields[0].metadata.type !== 'section_container' || currentData.name === 'Publications') {
        return null
    }

    if (ADDABLE_SECTION_NAMES.includes(currentData.name) && currentData.fields.some((el) => {
        return el.fields.some(el1 => !el1.metadata.submitted_value)
    })) {
        return null
    }
    if (ADDABLE_SECTION_NAMES.includes(currentData.name) && currentData.fields.filter(el => el.metadata.status !== 'DELETED').length === currentData.fields[0].fields[0].metadata.values.length) {
        return null
    }
    
    return button
}