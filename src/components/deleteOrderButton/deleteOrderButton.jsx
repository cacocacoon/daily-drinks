import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deleteOrders } from '../../actionCreators/actionCreators'
import './deleteOrderButton.scss'

export default function DeleteOrderButton() {
    const someButtonsAreChecked = useSelector(
        state => state.orders.list.map(order => order.checked).some(checked => checked)
    )

    const dispatch = useDispatch()
    function onDelete() {
        if (!someButtonsAreChecked) {
            return
        }

        dispatch(deleteOrders())
    }
    
    return (
        <button
            className="delete-order-btn btn"
            disabled={!someButtonsAreChecked}
            onClick={onDelete}
        >
            - Delete
        </button>
    )
}