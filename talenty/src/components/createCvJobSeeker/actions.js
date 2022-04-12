export default function changeTemplateData(data, id, value) {
    let temp = JSON.stringify(data)
    temp = JSON.parse(temp, (key, reviverValue) => {
        if (!reviverValue?.id) {
            return reviverValue
        }
        if (reviverValue?.id === id) {
            return {...reviverValue, metadata: {...reviverValue.metadata, submitted_value: value}}
        }
        return reviverValue
    })
    return temp
}

// isbook parameter for determine and add bookSubsection instead of article subsection variant
export const addSectionContainer = (templateData, id, isBook) => {
    let temp = JSON.stringify(templateData)
    temp = JSON.parse(temp, (key, reviverValue) => {
        if (!reviverValue?.id) {
            return reviverValue
        }
        if (reviverValue?.id === id) {
            let temp1 = JSON.stringify(reviverValue.fields[isBook ? 1 : 0])
            temp1 = JSON.parse(temp1, (key, val) => {
                if (!val?.id) {
                    return val
                }
                const metadata = {...val.metadata, submitted_value: '', status: 'NEW'}
                return {
                    ...val,
                    id: Math.random().toString(),
                    metadata,
                }
            })
            reviverValue.fields.push(temp1)
        }
        return reviverValue
    })
    return temp
}
export const deleteAddSectionContainer = ({templateData, id}) => {
    let result = JSON.stringify(templateData)
    result = JSON.parse(result, (key, reviverValue) => {
        if (!reviverValue?.id || reviverValue.metadata?.type !== 'section') {
            return reviverValue
        }
        return {
            ...reviverValue,
            fields: reviverValue.fields.filter(el => el.id !== id)
        }
    })
    return result
}

// below publication's section delete action
export const deletePublications = ({templateData, id}) => {
    let result = JSON.stringify(templateData)
    result = JSON.parse(result, (key, reviver) => {
        if (!reviver?.id || !reviver?.fields) {
            return reviver
        }
        if (reviver?.fields.some(el => el.id === id)) {
            if (id.startsWith('0')) {
                return {
                    ...reviver,
                    fields: reviver?.fields.filter(el => el.id !== id)
                }
            } else {
                return {
                    ...reviver,
                    fields: reviver?.fields.map(el => {
                        return el.id === id ? {
                            ...el,
                            metadata: {
                                ...el.metadata,
                                status: 'DELETED'
                            }
                        } : el
                    })
                }
            }
        } else {
            return reviver
        }
    })
    return result
}
