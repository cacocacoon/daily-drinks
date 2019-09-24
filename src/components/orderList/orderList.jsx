import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { checkOrder, showList } from '../../actionCreators/actionCreators'
import './orderList.scss'

export default function OrderList() {
    const dispatch = useDispatch()
    const orderList = useSelector(state => state.orders.list)
    function onCheck(e) {
        e.stopPropagation()
        e.preventDefault()
        const index = Number(e.target.dataset.index)
        const checkOrderAction = checkOrder(index)
        dispatch(checkOrderAction)
    }

    function editOrder(e) {
        console.log('edit');

    }

    useEffect(() => {
        dispatch(showList(true))
        return () => dispatch(showList(false))
    }, [dispatch])

    if (orderList.length === 0) {
        return (
            <div className="empty-order-list">
                Empty
            </div>
        )
    }

    return (
        <div className="order-list">
            <div className="order-list-head">
                <div className="checked"></div>
                <div className="name">Name</div>
                <div className="price">Price</div>
                <div className="notes">Notes</div>
            </div>
            {orderList.map((order, index) => (
                <Link key={index} to={`/order/${index}`} className="order" onClick={editOrder}>
                    <div className="checked" onClick={onCheck} data-index={index}>{order.checked ? '●' : '○'}</div>
                    <div className="name">{order.name}</div>
                    <div className="price">{order.price}</div>
                    <div className="notes">{order.notes}</div>
                </Link>
            ))}
        </div>
    )
}