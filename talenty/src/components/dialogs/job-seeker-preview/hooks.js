import {useSelector} from "react-redux";
import {selectTemplateData} from "../../../store/globalData/selector";
import {useMemo} from "react";
import {LEFT_SECTION_NAMES} from "./constants";

// seperates two types of data for drawing jobseekere cv preview ps yaxq code
export const useRightLeftSections = () => {
    const templateData = useSelector(selectTemplateData)
    const [leftSections, rightSections] = useMemo(() => {
        let right = []
        let left = []
        if (!templateData) {
            return [[], []]
        }
        templateData.fields.forEach(el => {
            if (LEFT_SECTION_NAMES.includes(el.name)) {
                left.push(el)
            } else {
                right.push(el)
            }
        })
        return [left, right]
    }, [templateData])
    return [leftSections, rightSections]
}