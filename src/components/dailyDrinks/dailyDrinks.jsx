import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import NewOrderButton from '../newOrderButton/newOrderButton'
import DeleteOrderButton from '../deleteOrderButton/deleteOrderButton'
import OrderList from '../orderList/orderList'
import OrderDetail from '../orderDetail/orderDetail'
import './dailyDrinks.scss'

export default function DailyDrinks() {
    const showList = useSelector(state => state.ui.showList)
    return (
        <div className="daily-drinks">
            <h1 className="daily-drinks-h1">Daily Drinks</h1>
            <Router>
                {showList && <DeleteOrderButton />}
                {showList && <NewOrderButton />}
                <div className="daily-drinks-body">
                    <Switch>
                        <Route path="/" component={OrderList} exact/>
                        <Route path="/order/:id?" component={OrderDetail} exact/>
                        <Redirect to="/" />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}