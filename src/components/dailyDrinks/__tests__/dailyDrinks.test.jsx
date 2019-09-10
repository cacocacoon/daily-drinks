import React from 'react'
import TestRenderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import DailyDrinks from '../dailyDrinks'
import { isTSAnyKeyword } from '@babel/types'

function TestDailyDrinks({ store }) {
    return (
        <Provider store={store}>
            <DailyDrinks />
        </Provider>
    )
}

const mockStore = configureMockStore()

describe('Daily drinks', () => {
    it('show list', () => {
        const store = mockStore({
            ui: { showList: true },
            orders: { list: [] }
        })
        const testDailyDrinks = TestRenderer.create(
            <TestDailyDrinks store={store} />
        )
        expect(testDailyDrinks.toJSON()).toMatchSnapshot()
    })
})