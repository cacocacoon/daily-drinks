import React from 'react'
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'

import NewOrderButton from '../newOrderButton'

describe('NewOrderButton', () => {
    it('default view', () => {
        const button = TestRenderer.create(
            <MemoryRouter>
                <NewOrderButton />
            </MemoryRouter>
        )
        expect(button.toJSON()).toMatchSnapshot()
    })
})