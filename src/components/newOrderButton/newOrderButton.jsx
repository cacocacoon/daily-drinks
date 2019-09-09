import React from 'react'
import { Link } from 'react-router-dom'
import './newOrderButton.scss'

export default function NewOrderButton() {
    return (
        <Link to="/order">
            <button className="new-order-btn btn">+ Add</button>
        </Link>
    )
}