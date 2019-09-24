import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder, editOrder } from '../../actionCreators/actionCreators'
import './orderDetail.scss'

const initOrder = {
    name: '',
    price: '0',
    notes: ''
}

export default function OrderDetail({ history, match }) {
    const id = Number(match.params.id)
    const existedOrder = useSelector(state => state.orders.list.filter((_, index) => index === id))[0]
    const isEditOrder = typeof id === 'number' && existedOrder
    const [order, setOrder] = useState(isEditOrder ? existedOrder : initOrder)
    const dispatch = useDispatch()

    function submit(e) {
        e.preventDefault()
        history.push('/')
        isEditOrder ? dispatch(editOrder(id, order)) : dispatch(addOrder(order))
        setOrder(initOrder)
    }

    function inputChange(e) {
        const id = e.target.id
        const value = e.target.value
        setOrder(order => ({ ...order, [id]: value }))
    }

    function cancel(e) {
        e.preventDefault()
        history.push('/');
    }

    return (
        <form className="order-detail" onSubmit={submit}>
            <label htmlFor="name">Name:</label><br />
            <input type="text" id="name" onChange={inputChange} value={order.name} required autoFocus /><br />
            <label htmlFor="price">Price:</label><br />
            <input type="number" id="price" onChange={inputChange} value={order.price} min="0" required /><br />
            <label htmlFor="notes">Notes:</label><br />
            <textarea type="textarea" wrap="hard" rows="3" id="notes" onChange={inputChange} value={order.notes} />
            <div className="button-group">
                <button type="submit" className="btn ok">Okey</button>
                <button className="cancel btn" onClick={cancel}>Cancel</button>
            </div>
        </form>
    )
}