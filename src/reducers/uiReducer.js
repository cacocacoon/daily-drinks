import { SHOW_LIST } from '../actionCreators/actionCreators'

const initState = {
    showList: false
}

export default function uiReducer(state = initState, action) {
    switch (action.type) {
        case SHOW_LIST:
            return { ...state, showList: action.payload }
        default:
            return state
    }
}