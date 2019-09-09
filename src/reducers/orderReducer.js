import {
    ADD_ORDER,
    CHECK_ORDER,
    DELETE_ORDERS,
    EDIT_ORDER
} from '../actionCreators/actionCreators'

const initState = {
    list: [{
        name: 'iPhone X',
        price: '1099.99',
        checked: false,
        notes: `iPhone X classic case * 1`
    }, {
        name: 'Electric Bike E7',
        price: '2100',
        checked: false,
        notes: `if you never try, you never know`
    }, {
        name: 'Sony RX100',
        price: '450.50',
        checked: true,
        notes: `battery * 2, Be happy:)`
    }]
}

export default function orderReducer(state = initState, action) {
    switch (action.type) {
        case ADD_ORDER: {
            return { ...state, list: [...state.list, action.payload] }
        }
        case CHECK_ORDER: {
            const order = state.list.filter((_, index) => index === action.payload)[0]
            order.checked = !order.checked
            
            return { ...state, list: [...state.list] }
        }
        case DELETE_ORDERS: {
            const newList = state.list.filter(order => !order.checked)

            return { ...state, list: [...newList] }
        }
        case EDIT_ORDER: {
            state.list[action.payload.id] = action.payload.order

            return { ...state, list: [...state.list] }
        }
        default:
            return state
    }
}