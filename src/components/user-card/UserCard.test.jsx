import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import thunk from 'redux-thunk'
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserCard from "./UserCard";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);

describe('UserCard Component Tests', () => {
    let store, history, component;

    beforeEach(() => {
        history = createMemoryHistory();

        store = mockStore({
            users: {
                isLoading: false,
                users: null,
                message: undefined
            },
        });

        const mockUser = {
            name: 'Michael Jordan',
            email: 'mjordan@kyrrus.com',
            id: '125'
        }

        store.dispatch = jest.fn();

        component = render(
            <Router location={history.location} navigator={history}>
                <Provider store={store}>
                    <UserCard user={mockUser} />
                </Provider>
            </Router>
        );
    });

    test('it should match snaphot', () => {
        expect(component).toMatchSnapshot();
    });

    test('Edit Icon should be in the document and navigate to user edit page', () => {
        const editIcon = screen.getByRole('link', { name: 'edit-details' });
        expect(editIcon).toBeInTheDocument();

        fireEvent.click(editIcon)
        expect(history.location.pathname).toBe('/users/125')
    });

    test('Delete Icon should be in the document', () => {
        const deleteIcon = screen.getByRole('button', { name: 'delete-user' });
        expect(deleteIcon).toBeInTheDocument();

        fireEvent.click(deleteIcon);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

});