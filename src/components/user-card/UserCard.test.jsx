import React from 'react';
import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react';
import { rdxRender } from '../../utils/test-utils';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import UserCard from "./UserCard";

describe('UserCard Component Tests', () => {
    let wrapper, mockDispatch, history;

    beforeEach(() => {
        history = createMemoryHistory();
        mockDispatch = jest.fn();

        const mockUser = {
            name: 'Michael Jordan',
            email: 'mjordan@kyrrus.com',
            id: '125'
        }

        const mockProps = {
            user: mockUser,
            dispatch: mockDispatch
        }

        wrapper = rdxRender(
            <Router location={history.location} navigator={history}>
                <UserCard {...mockProps} />
            </Router>,
            {});
    })

    test('it should match snaphot', () => {
        expect(wrapper).toMatchSnapshot();
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
    });

})