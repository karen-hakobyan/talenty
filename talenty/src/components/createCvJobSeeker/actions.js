export default function changeTemplateData(data, id, value) {
    let temp = JSON.stringify(data)
    temp = JSON.parse(temp, (key, reviverValue) => {
        if(!reviverValue.id) {
            return reviverValue
        }
        if(reviverValue.id === id) {
            return {...reviverValue, metadata: {...reviverValue.metadata, submitted_value: value}}
        }
        return reviverValue
    })
    return temp
}
