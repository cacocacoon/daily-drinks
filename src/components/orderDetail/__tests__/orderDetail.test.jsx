import React from 'react'
import ReactDOM from 'react-dom'
import { act } from "react-dom/test-utils"
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import TestRenderer from 'react-test-renderer'
import { render, fireEvent } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'

import OrderDetail from '../orderDetail'

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(document.body);
});
const mockStore = configureMockStore()

function TestOrderDetail({store, initialEntries }) {
    return (
        <Provider store={store}>
            <MemoryRouter initialEntries={initialEntries}>
                <Switch>
                    <Route path="/order/:id?" component={OrderDetail} exact/>
                </Switch>
            </MemoryRouter>
        </Provider>
    )
}

describe('OrderDetail', () => {
    it('/Order, Add new order view', () => {
        const store = mockStore({ orders: { list: [] } })
        const orderDetail = TestRenderer.create(
            <TestOrderDetail store={store} initialEntries={["/order"]} />
        )
        expect(orderDetail.toJSON()).toMatchSnapshot()
    })

    it('/order/0, edit iPhone X view', () => {
        const store = mockStore({ orders: { list: [{
            name: 'iPhone X',
            price: '1099.99',
            checked: false,
            notes: `iPhone X classic case * 1`
        }] } })
        const orderDetail = TestRenderer.create(
            <TestOrderDetail store={store} initialEntries={["/order/0"]} />
        )
        expect(orderDetail.toJSON()).toMatchSnapshot()
    })

    it('/Order, edit un exisited order view', () => {
        const store = mockStore({ orders: { list: [] } })
        const orderDetail = TestRenderer.create(
            <TestOrderDetail store={store} initialEntries={["/order/3"]} />
        )
        expect(orderDetail.toJSON()).toMatchSnapshot()
    })

    it('submit', () => {
        const store = mockStore({ orders: { list: [] } })
        store.dispatch = jest.fn(() => {})
        let renderResults
        act(() => {
            renderResults = render(<TestOrderDetail store={store} initialEntries={["/order"]} />)
        })
        const submit = renderResults.container.querySelector('.ok')
        submit.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        expect(store.dispatch).toHaveBeenCalledTimes(1)
    })

    it('input change', () => {
        const store = mockStore({ orders: { list: [] } })
        act(() => {
            render(<TestOrderDetail store={store} initialEntries={["/order"]} />)
        })

        const name = document.getElementById('name')
        const price = document.getElementById('price')
        const notes = document.getElementById('notes')
        act(() => {
            fireEvent.change(name, { target: { value: 'Macbook Pro 13' } })
            fireEvent.change(price, { target: { value: '1199' } })
            fireEvent.change(notes, { target: { value: 'good computer' } })
        })

        expect(name.value).toBe('Macbook Pro 13')
        expect(price.value).toBe('1199')
        expect(notes.value).toBe('good computer')
    })
})