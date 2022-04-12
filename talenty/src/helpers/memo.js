import {memo} from 'react'
import {compareObjects} from "./compareTwoData";

export default function memoPropsAreEqual(prev, next) {
    return JSON.stringify(prev) !== JSON.stringify(next)
}

// below function is returning memoized version of type components
export const memoizeTypeComponents = (typeComponents) => {
    return Object.keys(typeComponents).reduce((acc, item) => {
        acc[item] = memo(typeComponents[item], (prev, next) => {
            return compareObjects(next, prev)
        })
        return acc
    }, {})
}