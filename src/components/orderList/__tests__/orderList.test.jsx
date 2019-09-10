import React from 'react'
import ReactDOM from 'react-dom'
import { act } from "react-dom/test-utils"
import { render } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { MemoryRouter, Route, Switch } from 'react-router-dom'

import OrderList from '../orderList'

afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(document.body);
});
const mockStore = configureMockStore()

function TestOrderList({ store }) {
    return (
        <Provider store={store}>
            <MemoryRouter>
                <Switch>
                    <Route path="/" component={OrderList} exact/>
                </Switch>
            </MemoryRouter>
        </Provider>
    )
}

describe('OrderList', () => {
    it('default view', () => {
        const store = mockStore({ orders: { list: [{
            name: 'iPhone X',
            price: '1099.99',
            checked: false,
            notes: `iPhone X classic case * 1`
        }, {
            name: 'Electric Bike E7',
            price: '2100',
            checked: true,
            notes: `if you never try, you never know`
        }] } })
        const orderDetail = TestRenderer.create(
            <TestOrderList store={store} />
        )
        expect(orderDetail.toJSON()).toMatchSnapshot()
    })

    it('empty view', () => {
        const store = mockStore({ orders: { list: [] } })
        const orderDetail = TestRenderer.create(
            <TestOrderList store={store} />
        )
        expect(orderDetail.toJSON()).toMatchSnapshot()
    })

    it('submit', () => {
        const store = mockStore({ orders: { list: [{
            name: 'iPhone X',
            price: '1099.99',
            checked: false,
            notes: `iPhone X classic case * 1`
        }] } })
        store.dispatch = jest.fn(() => {})
        let renderResults
        act(() => {
            renderResults = render(<TestOrderList store={store} />)
        })
        const checked = renderResults.container.querySelector('.checked')
        checked.dispatchEvent(new MouseEvent('click', { bubbles: true }))

        expect(store.dispatch.mock.calls[0][0]).toStrictEqual({ payload: true, type: "SHOW_LIST"})
        expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
})