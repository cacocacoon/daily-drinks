import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import DailyDrinks from './components/dailyDrinks/dailyDrinks'
import store from './store';
import './app.scss'

function App() {
    return (
        <Provider store={store}>
            <DailyDrinks />
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
