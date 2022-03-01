export default function changeTemplateData(data, id, value) {
    let temp = JSON.stringify(data)
    temp = JSON.parse(temp, (key, reviverValue) => {
        if (!reviverValue.id) {
            return reviverValue
        }
        if (reviverValue.id === id) {
            return {...reviverValue, metadata: {...reviverValue.metadata, submitted_value: value}}
        }
        return reviverValue
    })
    return temp
}

export const addSectionContainer = (templateData, id) => {
    let temp = JSON.stringify(templateData)
    temp = JSON.parse(temp, (key, reviverValue) => {
        if(!reviverValue.id) {
            return reviverValue
        }
        if(reviverValue.id === id) {
            let temp1 = JSON.stringify(reviverValue.fields[0])
            temp1 = JSON.parse(temp1, (key, val) => {
                if(!val.id) {
                    return val
                }
                return {
                    ...val,
                    id: Math.random().toString(),
                    metadata: {...val.metadata, submitted_value: ''},
                }
            })
            reviverValue.fields.push(temp1)
        }
        return reviverValue
     })

    return temp

}
