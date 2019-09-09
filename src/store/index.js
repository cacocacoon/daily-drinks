import { combineReducers, createStore } from 'redux'
import reducers from '../reducers'

const reducer = combineReducers(reducers)
const store = process.env.NODE_ENV === 'production' ? createStore(reducer) : createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store