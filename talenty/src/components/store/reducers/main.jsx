const initialState = {
    sargis: 'sargis'
}

function main(state = initialState, action) {
    switch (action.type) {
        case '5':
            return {
                ...state,
                sargis: action.payload
            }
            break;

        default: return state
    }
}
export default main