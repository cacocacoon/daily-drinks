import React from 'react'
import ReactDOM from 'react-dom'
import { act } from "react-dom/test-utils"
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import TestRenderer from 'react-test-renderer'

import DeleteOrderButton from '../deleteOrderButton'
afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(document.body);
});
const mockStore = configureMockStore()

function TestDeleteOrderButton({ store }) {
    return (
        <Provider store={store}>
            <DeleteOrderButton />
        </Provider>
    )
}

describe('Delete Order Button', () => {
    it('disabled view', () => {
        const store = mockStore({ orders: { list: [] } })
        const deleteOrderButton = TestRenderer.create(
            <TestDeleteOrderButton store={store} />
        )
        expect(deleteOrderButton.toJSON()).toMatchSnapshot()
    })

    it('enabled view', () => {
        const store = mockStore({ orders: { list: [
            // { checked: false },
            { checked: true }
        ] } })
        const deleteOrderButton = TestRenderer.create(
            <TestDeleteOrderButton store={store} />
        )
        expect(deleteOrderButton.toJSON()).toMatchSnapshot()
    })

    it('disabled function', () => {
        const store = mockStore({ orders: { list: [] } })
        store.dispatch = jest.fn(() => {})
        let renderResults
        act(() => {
            renderResults = render(<TestDeleteOrderButton store={store} />)
        })
        const btn = renderResults.container.querySelector('.delete-order-btn')
        btn.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        expect(store.dispatch).toHaveBeenCalledTimes(0)
    })

    it('enabled function', () => {
        const store = mockStore({ orders: { list: [{ checked: true }] } })
        store.dispatch = jest.fn(() => {})
        let renderResults
        act(() => {
            renderResults = render(<TestDeleteOrderButton store={store} />)
        })
        const btn = renderResults.container.querySelector('.delete-order-btn')
        btn.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        expect(store.dispatch.mock.calls[0][0]).toStrictEqual({ type: "DELETE_ORDERS"} )
        expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
})