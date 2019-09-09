export const ADD_ORDER = 'ADD_ORDER'
export const SHOW_LIST = 'SHOW_LIST'
export const CHECK_ORDER = 'CHECK_ORDER'
export const DELETE_ORDERS = 'DELETE_ORDERS'
export const EDIT_ORDER = 'EDIT_ORDER'

export function addOrder(order) {
    return {
        type: ADD_ORDER,
        payload: order
    }
}

export function showList(show) {
    return {
        type: SHOW_LIST,
        payload: show
    }
}

export function checkOrder(index) {
    return {
        type: CHECK_ORDER,
        payload: index
    }
}

export function deleteOrders() {
    return {
        type: DELETE_ORDERS
    }
}

export function editOrder(id, order) {
    return {
        type: EDIT_ORDER,
        payload: {
            id,
            order
        }
    }
}